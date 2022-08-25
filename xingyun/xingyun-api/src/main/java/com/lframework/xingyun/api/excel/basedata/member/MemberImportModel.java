package com.lframework.xingyun.api.excel.basedata.member;

import com.alibaba.excel.annotation.ExcelIgnore;
import com.alibaba.excel.annotation.ExcelProperty;
import com.lframework.starter.mybatis.enums.Gender;
import com.lframework.starter.web.components.excel.ExcelModel;
import java.util.Date;
import lombok.Data;

@Data
public class MemberImportModel implements ExcelModel {

  /**
   * ID
   */
  @ExcelIgnore
  private String id;

  /**
   * 是否为新增
   */
  @ExcelIgnore
  private Boolean isInsert;

  /**
   * 编号
   */
  @ExcelProperty("编号")
  private String code;

  /**
   * 名称
   */
  @ExcelProperty("名称")
  private String name;

  /**
   * 性别
   */
  @ExcelProperty("性别")
  private String gender;

  /**
   * 性别
   */
  @ExcelIgnore
  private Gender genderEnum;

  /**
   * 联系电话
   */
  @ExcelProperty("联系电话")
  private String telephone;

  /**
   * 电子邮箱
   */
  @ExcelProperty("电子邮箱")
  private String email;

  /**
   * 出生日期
   */
  @ExcelProperty("出生日期")
  private Date birthday;

  /**
   * 入会日期
   */
  @ExcelProperty("入会日期")
  private Date joinDay;

  /**
   * 所属门店ID
   */
  @ExcelIgnore
  private String shopId;

  /**
   * 所属门店编号
   */
  @ExcelProperty("所属门店编号")
  private String shopCode;

  /**
   * 所属导购ID
   */
  @ExcelIgnore
  private String guiderId;

  /**
   * 所属导购编号
   */
  @ExcelProperty("所属导购编号")
  private String guiderCode;

  /**
   * 备注
   */
  @ExcelProperty("备注")
  private String description;
}
