package com.lframework.xingyun.api.controller.basedata.product;

import com.lframework.common.exceptions.impl.DefaultClientException;
import com.lframework.common.utils.CollectionUtil;
import com.lframework.starter.mybatis.resp.PageResult;
import com.lframework.starter.mybatis.utils.PageResultUtil;
import com.lframework.starter.security.controller.DefaultBaseController;
import com.lframework.starter.web.resp.InvokeResult;
import com.lframework.starter.web.resp.InvokeResultBuilder;
import com.lframework.starter.web.utils.ExcelUtil;
import com.lframework.xingyun.api.bo.basedata.product.poly.GetProductPolyBo;
import com.lframework.xingyun.api.bo.basedata.product.poly.QueryProductPolyBo;
import com.lframework.xingyun.api.excel.basedata.product.poly.ProductPolyImportListener;
import com.lframework.xingyun.api.excel.basedata.product.poly.ProductPolyImportModel;
import com.lframework.xingyun.basedata.dto.product.poly.ProductPolyDto;
import com.lframework.xingyun.basedata.entity.ProductPoly;
import com.lframework.xingyun.basedata.service.product.IProductPolyPropertyService;
import com.lframework.xingyun.basedata.service.product.IProductPolyService;
import com.lframework.xingyun.basedata.vo.product.poly.CreateProductPolyVo;
import com.lframework.xingyun.basedata.vo.product.poly.QueryProductPolyVo;
import com.lframework.xingyun.basedata.vo.product.poly.UpdateProductPolyVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * ??????SPU??????
 *
 * @author zmj
 */
@Api(tags = "??????SPU??????")
@Validated
@RestController
@RequestMapping("/basedata/product/poly")
public class ProductPolyController extends DefaultBaseController {

  @Autowired
  private IProductPolyService productPolyService;

  @Autowired
  private IProductPolyPropertyService productPolyPropertyService;

  /**
   * ????????????
   */
  @ApiOperation("????????????")
  @PreAuthorize("@permission.valid('base-data:product:poly:query')")
  @GetMapping("/query")
  public InvokeResult<PageResult<QueryProductPolyBo>> query() {

    throw new DefaultClientException("?????????????????????!");

  }

  /**
   * ??????????????????
   */
  @ApiOperation("??????")
  @PreAuthorize("@permission.valid('base-data:product:info:modify', 'base-data:product:poly:modify')")
  @PostMapping
  public InvokeResult<Void> create() {

    throw new DefaultClientException("???????????????!");
  }

  /**
   * ??????ID??????
   */
  @ApiOperation("??????ID??????")
  @ApiImplicitParam(value = "id", name = "id", paramType = "query", required = true)
  @PreAuthorize("@permission.valid('base-data:product:poly:query')")
  @GetMapping
  public InvokeResult<GetProductPolyBo> get() {

    throw new DefaultClientException("??????ID???????????????!");
  }

  /**
   * ??????
   */
  @ApiOperation("??????")
  @PreAuthorize("@permission.valid('base-data:product:poly:modify')")
  @PutMapping
  public InvokeResult<Void> update() {

    throw new DefaultClientException("???????????????!");
  }

  @ApiOperation("??????????????????")
  @PreAuthorize("@permission.valid('base-data:product:poly:import')")
  @GetMapping("/import/template")
  public void downloadImportTemplate() {
    ExcelUtil.exportXls("??????SPU????????????", ProductPolyImportModel.class);
  }

  @ApiOperation("??????")
  @PreAuthorize("@permission.valid('base-data:product:poly:import')")
  @PostMapping("/import")
  public InvokeResult<Void> importExcel(@NotBlank(message = "ID????????????") String id,
      @NotNull(message = "???????????????") MultipartFile file) {

    ProductPolyImportListener listener = new ProductPolyImportListener();
    listener.setTaskId(id);
    ExcelUtil.read(file, ProductPolyImportModel.class, listener).sheet().doRead();

    return InvokeResultBuilder.success();
  }
}
