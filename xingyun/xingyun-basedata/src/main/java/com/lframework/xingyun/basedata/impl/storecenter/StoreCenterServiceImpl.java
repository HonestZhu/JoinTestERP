package com.lframework.xingyun.basedata.impl.storecenter;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.github.pagehelper.PageInfo;
import com.lframework.common.constants.StringPool;
import com.lframework.common.exceptions.impl.DefaultClientException;
import com.lframework.common.exceptions.impl.InputErrorException;
import com.lframework.common.utils.Assert;
import com.lframework.common.utils.CollectionUtil;
import com.lframework.common.utils.ObjectUtil;
import com.lframework.common.utils.StringUtil;
import com.lframework.starter.mybatis.annotations.OpLog;
import com.lframework.starter.mybatis.enums.OpLogType;
import com.lframework.starter.mybatis.impl.BaseMpServiceImpl;
import com.lframework.starter.mybatis.resp.PageResult;
import com.lframework.starter.mybatis.utils.OpLogUtil;
import com.lframework.starter.mybatis.utils.PageHelperUtil;
import com.lframework.starter.mybatis.utils.PageResultUtil;
import com.lframework.starter.web.utils.IdUtil;
import com.lframework.xingyun.basedata.entity.StoreCenter;
import com.lframework.xingyun.basedata.mappers.StoreCenterMapper;
import com.lframework.xingyun.basedata.service.storecenter.IStoreCenterService;
import com.lframework.xingyun.basedata.vo.storecenter.CreateStoreCenterVo;
import com.lframework.xingyun.basedata.vo.storecenter.QueryStoreCenterSelectorVo;
import com.lframework.xingyun.basedata.vo.storecenter.QueryStoreCenterVo;
import com.lframework.xingyun.basedata.vo.storecenter.UpdateStoreCenterVo;
import com.lframework.xingyun.core.dto.dic.city.DicCityDto;
import com.lframework.xingyun.core.service.IDicCityService;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import com.mchange.lang.IntegerUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StoreCenterServiceImpl extends BaseMpServiceImpl<StoreCenterMapper, StoreCenter>
        implements IStoreCenterService {

    @Autowired
    private IDicCityService dicCityService;

    @Override
    public PageResult<StoreCenter> query(Integer pageIndex, Integer pageSize, QueryStoreCenterVo vo) {
        Assert.greaterThanZero(pageIndex);
        Assert.greaterThanZero(pageSize);
        
        PageHelperUtil.startPage(pageIndex, pageSize);
        List<StoreCenter> datas = getBaseMapper().query(vo);
        
       return PageResultUtil.convert(new PageInfo<>(datas));
    }

    @Cacheable(value = StoreCenter.CACHE_NAME, key = "#id", unless = "#result == null")
    @Override
    public StoreCenter findById(String id) {

        return getBaseMapper().selectById(id);
    }

    @OpLog(type = OpLogType.OTHER, name = "???????????????ID???{}", params = "#ids", loopFormat = true)
    @Transactional
    @Override
    public void batchUnable(Collection<String> ids) {
        if(CollectionUtil.isEmpty(ids)) {
            return;
        }

        Wrapper<StoreCenter> updateWrapper = Wrappers.lambdaUpdate(StoreCenter.class)
                .set(StoreCenter::getAvailable, Boolean.FALSE).in(StoreCenter::getId, ids);
        getBaseMapper().update(updateWrapper);
    }

    @OpLog(type = OpLogType.OTHER, name = "???????????????ID???{}", params = "#ids", loopFormat = true)
    @Transactional
    @Override
    public void batchEnable(Collection<String> ids) {
        if(CollectionUtil.isEmpty(ids)) {
            return;
        }

        Wrapper<StoreCenter> updateWrapper = Wrappers.lambdaUpdate(StoreCenter.class)
                .set(StoreCenter::getAvailable, Boolean.TRUE).in(StoreCenter::getId, ids);
        getBaseMapper().update(updateWrapper);
    }

    @OpLog(type = OpLogType.OTHER, name = "???????????????ID???{}, ?????????{}", params = {"#id", "#code"})
    @Transactional
    @Override
    public String create(CreateStoreCenterVo vo) {
        Wrapper<StoreCenter> checkWrapper = Wrappers.lambdaQuery(StoreCenter.class).eq(StoreCenter::getCode, vo.getCode());
        if(getBaseMapper().selectCount(checkWrapper) > 0) {
            throw new DefaultClientException("?????????????????????????????????");
        }

        StoreCenter data = new StoreCenter();
        data.setId(IdUtil.getId());
        data.setCode(vo.getCode());
        data.setName(vo.getName());
        if(!StringUtil.isBlank(vo.getContact())) {
            data.setContact(vo.getContact());
        }
        if(!StringUtil.isBlank(vo.getTelephone())) {
            data.setTelephone(vo.getTelephone());
        }
        if(!StringUtil.isBlank(vo.getCityId())) {
            // city_id ?????? id???????????????
            DicCityDto city = dicCityService.findById(vo.getCityId());
            if(!ObjectUtil.isNull(city)) {
                data.setCityId(vo.getCityId());
            }
        }
        if(!StringUtil.isBlank(vo.getAddress())) {
            data.setAddress(vo.getAddress());
        }
        if(vo.getPeopleNum() != null) {
            data.setPeopleNum(vo.getPeopleNum());
        }

        data.setAvailable(Boolean.TRUE);
        data.setDescription(StringUtil.isBlank(vo.getDescription()) ? StringPool.EMPTY_STR : vo.getDescription());

        getBaseMapper().insert(data);

        OpLogUtil.setVariable("id", data.getId());
        OpLogUtil.setVariable("code", data.getCode());
        OpLogUtil.setExtra(vo);
        return data.getId();
    }

    @OpLog(type = OpLogType.OTHER, name = "???????????????ID???{}, ?????????{}", params = {"#id", "#code"})
    @Transactional
    @Override
    public void update(UpdateStoreCenterVo vo) {
        StoreCenter data = getBaseMapper().selectById(vo.getId());
        if(ObjectUtil.isNull(data)) {
            throw new DefaultClientException("??????????????????");
        }

        Wrapper<StoreCenter> checkWrapper = Wrappers.lambdaQuery(StoreCenter.class).eq(StoreCenter::getCode, vo.getCode())
                .ne(StoreCenter::getId, vo.getId());
        if(getBaseMapper().selectCount(checkWrapper) > 0) {
            throw new DefaultClientException("?????????????????????????????????");
        }

        LambdaUpdateWrapper<StoreCenter> updateWrapper = Wrappers.lambdaUpdate(StoreCenter.class)
                .set(StoreCenter::getCode, vo.getCode())
                .set(StoreCenter::getName, !StringUtil.isBlank(vo.getName()) ? vo.getName() : null)
                .set(StoreCenter::getContact, !StringUtil.isBlank(vo.getContact()) ? vo.getContact() : null)
                .set(StoreCenter::getTelephone, !StringUtil.isBlank(vo.getTelephone()) ? vo.getTelephone() : null)
                .set(StoreCenter::getAddress, !StringUtil.isBlank(vo.getAddress()) ? vo.getAddress() : null)
                .set(StoreCenter::getPeopleNum, vo.getPeopleNum())
                .set(StoreCenter::getAvailable, vo.getAvailable())
                .set(StoreCenter::getDescription, StringUtil.isBlank(vo.getDescription()) ? StringPool.EMPTY_STR : vo.getDescription())
                .eq(StoreCenter::getId, vo.getId());

        if(!StringUtil.isBlank(vo.getCityId())) {
            DicCityDto city = dicCityService.findById(vo.getCityId());
            if(!ObjectUtil.isNull(city)) {
                updateWrapper.set(StoreCenter::getCityId, vo.getCityId());
            }
        } else {
            updateWrapper.set(StoreCenter::getCityId, null);
        }

        getBaseMapper().update(updateWrapper);

        OpLogUtil.setVariable("id", data.getId());
        OpLogUtil.setVariable("code", vo.getCode());
        OpLogUtil.setExtra(vo);
    }

    @Override
    public PageResult<StoreCenter> selector(Integer pageIndex, Integer pageSize, QueryStoreCenterSelectorVo vo) {

        Assert.greaterThanZero(pageIndex);
        Assert.greaterThanZero(pageSize);

        PageHelperUtil.startPage(pageIndex, pageSize);
        List<StoreCenter> datas = getBaseMapper().selector(vo);


       return PageResultUtil.convert(new PageInfo<>(datas));
    }

    @CacheEvict(value = StoreCenter.CACHE_NAME, key = "#key")
    @Override
    public void cleanCacheByKey(Serializable key) {

    }
}
