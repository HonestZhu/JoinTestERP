package com.lframework.xingyun.api.controller.basedata.storecenter;

import com.lframework.common.exceptions.impl.DefaultClientException;

import com.lframework.starter.mybatis.resp.PageResult;

import com.lframework.starter.security.controller.DefaultBaseController;
import com.lframework.starter.web.resp.InvokeResult;

import com.lframework.starter.web.resp.InvokeResultBuilder;
import com.lframework.starter.web.utils.ExcelUtil;
import com.lframework.xingyun.api.bo.basedata.storecenter.GetStoreCenterBo;
import com.lframework.xingyun.api.bo.basedata.storecenter.QueryStoreCenterBo;

import com.lframework.xingyun.api.excel.basedata.storecenter.StoreCenterImportModel;

import com.lframework.xingyun.basedata.service.storecenter.IStoreCenterService;

import com.lframework.xingyun.basedata.vo.storecenter.CreateStoreCenterVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


/**
 * 仓库管理
 *
 * @author zmj
 */
@Api(tags = "仓库管理")
@Validated
@RestController
@RequestMapping("/basedata/storecenter")
public class StoreCenterController extends DefaultBaseController {

  @Autowired
  private IStoreCenterService storeCenterService;

  /**
   * 仓库列表
   */
  @ApiOperation("仓库列表")
  @PreAuthorize("@permission.valid('base-data:store-center:query','base-data:store-center:add','base-data:store-center:modify')")
  @GetMapping("/query")
  public InvokeResult<PageResult<QueryStoreCenterBo>> query() {

    throw new DefaultClientException("仓库列表查询待完成!");

  }

  /**
   * 查询仓库
   */
  @ApiOperation("查询仓库")
  @ApiImplicitParam(value = "ID", name = "id", paramType = "query", required = true)
  @PreAuthorize("@permission.valid('base-data:store-center:query','base-data:store-center:add','base-data:store-center:modify')")
  @GetMapping
  public InvokeResult<GetStoreCenterBo> get() {


    throw new DefaultClientException("仓库查询待完成!");


  }

  /**
   * 批量停用仓库
   */
  @ApiOperation("批量停用仓库")
  @PreAuthorize("@permission.valid('base-data:store-center:modify')")
  @PatchMapping("/unable/batch")
  public InvokeResult<Void> batchUnable(
      ) {

    throw new DefaultClientException("批量停用仓库待完成!");

  }

  /**
   * 批量启用仓库
   */
  @ApiOperation("批量启用仓库")
  @PreAuthorize("@permission.valid('base-data:store-center:modify')")
  @PatchMapping("/enable/batch")
  public InvokeResult<Void> batchEnable(
      ) {

    throw new DefaultClientException("批量启用仓库待完成!");


  }

  /**
   * 新增仓库
   */
  @ApiOperation("新增仓库")
  @PreAuthorize("@permission.valid('base-data:store-center:add')")
  @PostMapping
  public InvokeResult<Void> create(
          @Valid CreateStoreCenterVo vo
          ) {
    storeCenterService.create(vo);
    return InvokeResultBuilder.success();
  }

  /**
   * 修改仓库
   */
  @ApiOperation("修改仓库")
  @PreAuthorize("@permission.valid('base-data:store-center:modify')")
  @PutMapping
  public InvokeResult<Void> update() {

    throw new DefaultClientException("修改仓库待完成!");

  }

  @ApiOperation("下载导入模板")
  @PreAuthorize("@permission.valid('base-data:store-center:import')")
  @GetMapping("/import/template")
  public void downloadImportTemplate() {
    ExcelUtil.exportXls("仓库导入模板", StoreCenterImportModel.class);
  }

  @ApiOperation("导入")
  @PreAuthorize("@permission.valid('base-data:store-center:import')")
  @PostMapping("/import")
  public InvokeResult<Void> importExcel() {

    throw new DefaultClientException("导入待完成!");

  }
}
