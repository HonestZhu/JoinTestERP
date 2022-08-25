package com.lframework.xingyun.sc.service.sale;

import com.lframework.starter.mybatis.service.BaseMpService;
import com.lframework.xingyun.sc.entity.SaleConfig;
import com.lframework.xingyun.sc.vo.sale.config.UpdateSaleConfigVo;

public interface ISaleConfigService extends BaseMpService<SaleConfig> {

  /**
   * 查询
   *
   * @return
   */
  SaleConfig get();

  /**
   * 修改
   *
   * @param vo
   */
  void update(UpdateSaleConfigVo vo);
}
