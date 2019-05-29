package cn.hope.hiket.service.impl;

import cn.hope.hiket.dao.GoodDao;
import cn.hope.hiket.entity.Good;
import cn.hope.hiket.entity.Search;
import cn.hope.hiket.service.GoodService;
import cn.hope.hiket.utils.CommonUtil;
import cn.hope.hiket.utils.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GoodServiceImpl implements GoodService {
    @Autowired
    GoodDao goodDao;

    @Override
    public Good getGood(String openId, Long goodId) {
        if (CommonUtil.notUndefined(goodId)) {
            Good good = goodDao.select(goodId);
            fillGood(openId, good);
            return good;
        } else {
            throw new RuntimeException("获取 GoodId 失败");
        }
    }

    @Override
    public Good releaseGood(Good good) {
        boolean ret;
        if (CommonUtil.notUndefined(good.getGoodId())) {
            ret = goodDao.update(good) > 0;
            ret = ret & goodDao.deleteUploadImagePath(good.getGoodId()) > 0;
        } else {
            ret = goodDao.insert(good) > 0;
        }
        if (ret) {
            if (good.getUploadImagePathList() != null && good.getUploadImagePathList().size() > 0) {
                ret = goodDao.insertUploadImagePath(good.getGoodId(), good.getUploadImagePathList()) > 0;
            }
            if (ret && CommonUtil.notUndefined(good.getSellerOpenId())) {
                good = goodDao.select(good.getGoodId());
                fillGood(good.getSellerOpenId(), good);
                return good;
            } else {
                throw new RuntimeException("未知错误，发布失败");
            }
        } else {
            throw new RuntimeException("未知错误，发布失败");
        }
    }

    @Override
    public List<Good> searchActiveGood(Search search) {
        if (CommonUtil.notUndefined(search.getOpenId())) {
            List<Good> goodList = goodDao.selectActiveGood(search);
            fillGood(search.getOpenId(), goodList);
            return goodList;
        }else {
            throw new RuntimeException("获取 OpenId 失败");
        }
    }

    private void fillGood(String openId, Good good) {
        good.setUploadImagePathList(goodDao.selectUploadImagePathByGoodId(good.getGoodId()));
        good.setTimePast(TimeUtil.getTimePast(good.getCreateTime()));
        good.setFavoriteOpenIdList(goodDao.selectGoodFavoriteOpenIdListByGoodId(good.getGoodId()));
        good.setFavoriteNumber(good.getFavoriteOpenIdList().size());
        good.setMyFavorite(goodDao.selectIsMyFavorite(openId, good.getGoodId()) > 0);
        good.setMine(goodDao.selectIsMine(openId, good.getGoodId()) > 0);
    }

    private void fillGood(String openId, List<Good> goodList) {
        for (Good good : goodList) {
            fillGood(openId, good);
        }
    }

    @Override
    public boolean favoriteGood(String openId, Long goodId) {
        int ret = goodDao.insertGoodFavorite(openId, goodId);
        return ret > 0;
    }

    @Override
    public boolean noneFavoriteGood(String openId, Long goodId) {
        int ret = goodDao.deleteGoodFavorite(openId, goodId);
        return ret > 0;
    }

    @Override
    public List<Good> getMyFavoriteGood(String openId) {
        List<Long> myFavoriteGoodIdList = goodDao.selectFavoriteGoodId(openId);
        if (myFavoriteGoodIdList != null && myFavoriteGoodIdList.size() > 0) {
            List<Good> myFavoriteGoodList = goodDao.selectGoodByGoodIdList(myFavoriteGoodIdList);
            fillGood(openId, myFavoriteGoodList);
            return myFavoriteGoodList;
        }
        return new ArrayList<>();
    }

    @Override
    public List<Good> getMyGood(String openId) {
        List<Good> myGoodList = goodDao.selectMyGood(openId);
        fillGood(openId, myGoodList);
        return myGoodList;
    }

    @Override
    public boolean updateGoodState(Long goodId, Integer state) {
        int ret = goodDao.updateState(goodId, state);
        return ret > 0;
    }

    @Override
    public boolean browse(Long goodId) {
        return goodDao.increaseBrowseNumber(goodId) > 0;
    }
}
