package cn.hope.hiket.service;

import cn.hope.hiket.entity.Good;

import java.util.List;

public interface GoodService {
    Good getGood(String openId, Long goodId);

    Good releaseGood(Good good);

    List<Good> searchActiveGood(String openId,Integer section, String title,Integer beginIndex,Integer numberIndex);

    boolean favoriteGood(String openId,Long goodId);

    boolean noneFavoriteGood(String openId,Long goodId);

    List<Good> getMyFavoriteGood(String openId);

    List<Good> getMyGood(String openId);

    boolean updateGoodState(Long goodId, Integer state);

    boolean browse(Long goodId);
}
