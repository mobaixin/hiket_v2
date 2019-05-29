package cn.hope.hiket.dao;

import cn.hope.hiket.entity.Good;
import cn.hope.hiket.entity.Search;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GoodDao {
    int insert(Good good);

    Good select(Long goodId);

    int insertUploadImagePath(@Param("goodId") Long goodId, @Param("uploadImagePathList") List<String> uploadImagePathList);

    int deleteUploadImagePath(Long goodId);

    List<Good> selectActiveGood(Search search);

    List<String> selectUploadImagePathByGoodId(Long goodId);

    int selectGoodFavoriteNumberByGoodId(Long goodId);

    List<String> selectGoodFavoriteOpenIdListByGoodId(Long goodId);

    int insertGoodFavorite(@Param("openId") String openId, @Param("goodId") Long goodId);

    int deleteGoodFavorite(@Param("openId") String openId, @Param("goodId") Long goodId);

    int selectIsMyFavorite(@Param("openId") String openId, @Param("goodId") Long goodId);

    List<Long> selectFavoriteGoodId(String openId);

    List<Good> selectGoodByGoodIdList(@Param("goodIdList") List<Long> goodIdList);

    List<Good> selectMyGood(String openId);

    int selectIsMine(@Param("openId") String openId, @Param("goodId") Long goodId);

    int updateState(@Param("goodId") Long goodId,@Param("state")int state);

    int update(Good good);

    int increaseBrowseNumber(Long goodId);
}

