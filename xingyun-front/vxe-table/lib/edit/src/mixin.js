"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _utils = _interopRequireWildcard(require("../../tools/utils"));

var _dom = _interopRequireWildcard(require("../../tools/dom"));

var _log = require("../../tools/log");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getRowid = _utils.default.getRowid;

function insertTreeRow(_vm, newRecords, isAppend) {
  var tableFullTreeData = _vm.tableFullTreeData,
      afterFullData = _vm.afterFullData,
      fullDataRowIdData = _vm.fullDataRowIdData,
      fullAllDataRowIdData = _vm.fullAllDataRowIdData,
      treeOpts = _vm.treeOpts;
  var rowField = treeOpts.rowField,
      parentField = treeOpts.parentField,
      children = treeOpts.children,
      mapChildren = treeOpts.mapChildren;
  var funcName = isAppend ? 'push' : 'unshift';
  newRecords.forEach(function (item) {
    var parentRowId = item[parentField];
    var rowid = getRowid(_vm, item);
    var matchObj = parentRowId ? _xeUtils.default.findTree(tableFullTreeData, function (item) {
      return parentRowId === item[rowField];
    }, {
      children: mapChildren
    }) : null;

    if (matchObj) {
      var parentRow = matchObj.item;
      var parentRest = fullAllDataRowIdData[getRowid(_vm, parentRow)];
      var parentLevel = parentRest ? parentRest.level : 0;
      var parentChilds = parentRow[children];

      if (!_xeUtils.default.isArray(parentChilds)) {
        parentChilds = parentRow[children] = [];
      }

      parentChilds[funcName](item);
      var rest = {
        row: item,
        rowid: rowid,
        seq: -1,
        index: -1,
        _index: -1,
        $index: -1,
        items: parentChilds,
        parent: parent,
        level: parentLevel + 1
      };
      fullDataRowIdData[rowid] = rest;
      fullAllDataRowIdData[rowid] = rest;
    } else {
      if (process.env.NODE_ENV === 'development') {
        if (parentRowId) {
          (0, _log.warnLog)('vxe.error.unableInsert');
        }
      }

      afterFullData[funcName](item);
      tableFullTreeData[funcName](item);
      var _rest = {
        row: item,
        rowid: rowid,
        seq: -1,
        index: -1,
        _index: -1,
        $index: -1,
        items: tableFullTreeData,
        parent: null,
        level: 0
      };
      fullDataRowIdData[rowid] = _rest;
      fullAllDataRowIdData[rowid] = _rest;
    }
  });
}

var _default = {
  methods: {
    /**
     * ??????????????????????????????
     *
     * @param {*} records
     */
    _insert: function _insert(records) {
      return this.insertAt(records);
    },

    /**
     * ???????????????????????????????????????
     * ?????? row ???????????????????????????
     * ?????? row ??? -1 ?????????????????????
     * ?????? row ???????????????????????????????????????
     * @param {Object/Array} records ????????????
     * @param {Row} row ?????????
     */
    _insertAt: function _insertAt(records, row) {
      var _this = this,
          _editStore$insertList;

      var tableFullTreeData = this.tableFullTreeData,
          mergeList = this.mergeList,
          afterFullData = this.afterFullData,
          editStore = this.editStore,
          tableFullData = this.tableFullData,
          treeConfig = this.treeConfig,
          fullDataRowIdData = this.fullDataRowIdData,
          fullAllDataRowIdData = this.fullAllDataRowIdData,
          treeOpts = this.treeOpts;
      var transform = treeOpts.transform,
          rowField = treeOpts.rowField,
          mapChildren = treeOpts.mapChildren;

      if (!_xeUtils.default.isArray(records)) {
        records = [records];
      }

      var newRecords = records.map(function (record) {
        return _this.defineField(Object.assign({}, record));
      });

      if (!row) {
        // ??????????????????
        if (treeConfig && transform) {
          insertTreeRow(this, newRecords, false);
        } else {
          afterFullData.unshift.apply(afterFullData, _toConsumableArray(newRecords));
          tableFullData.unshift.apply(tableFullData, _toConsumableArray(newRecords)); // ?????????????????????

          mergeList.forEach(function (mergeItem) {
            var mergeRowIndex = mergeItem.row;

            if (mergeRowIndex > 0) {
              mergeItem.row = mergeRowIndex + newRecords.length;
            }
          });
        }
      } else {
        if (row === -1) {
          // ??????????????????
          if (treeConfig && transform) {
            insertTreeRow(this, newRecords, true);
          } else {
            afterFullData.push.apply(afterFullData, _toConsumableArray(newRecords));
            tableFullData.push.apply(tableFullData, _toConsumableArray(newRecords)); // ?????????????????????

            mergeList.forEach(function (mergeItem) {
              var mergeRowIndex = mergeItem.row,
                  mergeRowspan = mergeItem.rowspan;

              if (mergeRowIndex + mergeRowspan > afterFullData.length) {
                mergeItem.rowspan = mergeRowspan + newRecords.length;
              }
            });
          }
        } else {
          // ??????????????????
          if (treeConfig && transform) {
            var matchObj = _xeUtils.default.findTree(tableFullTreeData, function (item) {
              return row[rowField] === item[rowField];
            }, {
              children: mapChildren
            });

            if (matchObj) {
              var parentRow = matchObj.parent;
              var parentChilds = matchObj.items;
              var parentRest = fullAllDataRowIdData[getRowid(this, parentRow)];
              var parentLevel = parentRest ? parentRest.level : 0;
              newRecords.forEach(function (item, i) {
                var rowid = getRowid(_this, item);

                if (process.env.NODE_ENV === 'development') {
                  if (item[treeOpts.parentField]) {
                    if (parentRow && item[treeOpts.parentField] !== parentRow[rowField]) {
                      (0, _log.errLog)('vxe.error.errProp', ["".concat(treeOpts.parentField, "=").concat(item[treeOpts.parentField]), "".concat(treeOpts.parentField, "=").concat(parentRow[rowField])]);
                    }
                  }
                }

                if (parentRow) {
                  item[treeOpts.parentField] = parentRow[rowField];
                }

                parentChilds.splice(matchObj.index + i, 0, item);
                var rest = {
                  row: item,
                  rowid: rowid,
                  seq: -1,
                  index: -1,
                  _index: -1,
                  $index: -1,
                  items: parentChilds,
                  parent: parentRow,
                  level: parentLevel + 1
                };
                fullDataRowIdData[rowid] = rest;
                fullAllDataRowIdData[rowid] = rest;
              });
            } else {
              if (process.env.NODE_ENV === 'development') {
                (0, _log.warnLog)('vxe.error.unableInsert');
              }

              insertTreeRow(this, newRecords, true);
            }
          } else {
            if (treeConfig) {
              throw new Error(_utils.default.getLog('vxe.error.noTree', ['insert']));
            }

            var afIndex = -1; // ?????????????????????

            if (_xeUtils.default.isNumber(row)) {
              if (row < afterFullData.length) {
                afIndex = row;
              }
            } else {
              afIndex = afterFullData.indexOf(row);
            }

            if (afIndex === -1) {
              throw new Error((0, _log.errLog)('vxe.error.unableInsert'));
            }

            afterFullData.splice.apply(afterFullData, [afIndex, 0].concat(_toConsumableArray(newRecords)));
            tableFullData.splice.apply(tableFullData, [tableFullData.indexOf(row), 0].concat(_toConsumableArray(newRecords))); // ?????????????????????

            mergeList.forEach(function (mergeItem) {
              var mergeRowIndex = mergeItem.row,
                  mergeRowspan = mergeItem.rowspan;

              if (mergeRowIndex > afIndex) {
                mergeItem.row = mergeRowIndex + newRecords.length;
              } else if (mergeRowIndex + mergeRowspan > afIndex) {
                mergeItem.rowspan = mergeRowspan + newRecords.length;
              }
            });
          }
        }
      }

      (_editStore$insertList = editStore.insertList).unshift.apply(_editStore$insertList, _toConsumableArray(newRecords));

      this.handleTableData(treeConfig && transform);

      if (!(treeConfig && transform)) {
        this.updateAfterDataIndex();
      }

      this.updateFooter();
      this.cacheRowMap();
      this.checkSelectionStatus();

      if (this.scrollYLoad) {
        this.updateScrollYSpace();
      }

      return this.$nextTick().then(function () {
        _this.updateCellAreas();

        return _this.recalculate();
      }).then(function () {
        return {
          row: newRecords.length ? newRecords[newRecords.length - 1] : null,
          rows: newRecords
        };
      });
    },

    /**
     * ?????????????????????
     * ????????? row ???????????????
     * ????????? rows ???????????????
     * ???????????????????????????
     */
    _remove: function _remove(rows) {
      var _this2 = this;

      var afterFullData = this.afterFullData,
          tableFullData = this.tableFullData,
          tableFullTreeData = this.tableFullTreeData,
          treeConfig = this.treeConfig,
          mergeList = this.mergeList,
          editStore = this.editStore,
          checkboxOpts = this.checkboxOpts,
          selection = this.selection,
          isInsertByRow = this.isInsertByRow,
          treeOpts = this.treeOpts;
      var transform = treeOpts.transform;
      var actived = editStore.actived,
          removeList = editStore.removeList,
          insertList = editStore.insertList;
      var property = checkboxOpts.checkField;
      var rest = [];

      if (!rows) {
        rows = tableFullData;
      } else if (!_xeUtils.default.isArray(rows)) {
        rows = [rows];
      } // ?????????????????????????????????


      rows.forEach(function (row) {
        if (!isInsertByRow(row)) {
          removeList.push(row);
        }
      }); // ?????????????????????????????????????????????

      if (!property) {
        rows.forEach(function (row) {
          var sIndex = selection.indexOf(row);

          if (sIndex > -1) {
            selection.splice(sIndex, 1);
          }
        });
      } // ?????????????????????


      if (tableFullData === rows) {
        rows = rest = tableFullData.slice(0);
        this.tableFullData = [];
        this.afterFullData = [];
        this.clearMergeCells();
      } else {
        // ??????????????????
        if (treeConfig && transform) {
          rows.forEach(function (row) {
            var rowid = getRowid(_this2, row);

            var matchObj = _xeUtils.default.findTree(tableFullTreeData, function (item) {
              return rowid === getRowid(_this2, item);
            }, treeOpts);

            if (matchObj) {
              var rItems = matchObj.items.splice(matchObj.index, 1);
              rest.push(rItems[0]);
            }

            var afIndex = afterFullData.indexOf(row);

            if (afIndex > -1) {
              afterFullData.splice(afIndex, 1);
            }
          });
        } else {
          rows.forEach(function (row) {
            var tfIndex = tableFullData.indexOf(row);

            if (tfIndex > -1) {
              var rItems = tableFullData.splice(tfIndex, 1);
              rest.push(rItems[0]);
            }

            var afIndex = afterFullData.indexOf(row);

            if (afIndex > -1) {
              // ?????????????????????
              mergeList.forEach(function (mergeItem) {
                var mergeRowIndex = mergeItem.row,
                    mergeRowspan = mergeItem.rowspan;

                if (mergeRowIndex > afIndex) {
                  mergeItem.row = mergeRowIndex - 1;
                } else if (mergeRowIndex + mergeRowspan > afIndex) {
                  mergeItem.rowspan = mergeRowspan - 1;
                }
              });
              afterFullData.splice(afIndex, 1);
            }
          });
        }
      } // ??????????????????????????????????????????????????????


      if (actived.row && rows.indexOf(actived.row) > -1) {
        this.clearActived();
      } // ????????????????????????????????????


      rows.forEach(function (row) {
        var iIndex = insertList.indexOf(row);

        if (iIndex > -1) {
          insertList.splice(iIndex, 1);
        }
      });
      this.handleTableData(treeConfig && transform);

      if (!(treeConfig && transform)) {
        this.updateAfterDataIndex();
      }

      this.updateFooter();
      this.cacheRowMap();
      this.checkSelectionStatus();

      if (this.scrollYLoad) {
        this.updateScrollYSpace();
      }

      return this.$nextTick().then(function () {
        _this2.updateCellAreas();

        return _this2.recalculate();
      }).then(function () {
        return {
          row: rest.length ? rest[rest.length - 1] : null,
          rows: rest
        };
      });
    },

    /**
     * ??????????????????????????????
     */
    _removeCheckboxRow: function _removeCheckboxRow() {
      var _this3 = this;

      return this.remove(this.getCheckboxRecords()).then(function (params) {
        _this3.clearCheckboxRow();

        return params;
      });
    },

    /**
     * ??????????????????????????????
     */
    _removeRadioRow: function _removeRadioRow() {
      var _this4 = this;

      var radioRecord = this.getRadioRecord();
      return this.remove(radioRecord || []).then(function (params) {
        _this4.clearRadioRow();

        return params;
      });
    },

    /**
     * ??????????????????????????????
     */
    _removeCurrentRow: function _removeCurrentRow() {
      var _this5 = this;

      var currentRecord = this.getCurrentRecord();
      return this.remove(currentRecord || []).then(function (params) {
        _this5.clearCurrentRow();

        return params;
      });
    },

    /**
     * ??????????????????????????????????????????????????????
     */
    _getRecordset: function _getRecordset() {
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      };
    },

    /**
     * ???????????????????????????
     */
    _getInsertRecords: function _getInsertRecords() {
      var _this6 = this;

      var treeConfig = this.treeConfig,
          tableFullTreeData = this.tableFullTreeData,
          tableFullData = this.tableFullData,
          treeOpts = this.treeOpts;
      var insertList = this.editStore.insertList;
      var insertRecords = [];

      if (insertList.length) {
        // ??????????????????
        if (treeConfig && treeOpts.transform) {
          insertList.forEach(function (row) {
            var rowid = getRowid(_this6, row);

            var matchObj = _xeUtils.default.findTree(tableFullTreeData, function (item) {
              return rowid === getRowid(_this6, item);
            }, treeOpts);

            if (matchObj) {
              insertRecords.push(row);
            }
          });
        } else {
          insertList.forEach(function (row) {
            if (tableFullData.indexOf(row) > -1) {
              insertRecords.push(row);
            }
          });
        }
      }

      return insertRecords;
    },

    /**
     * ????????????????????????
     */
    _getRemoveRecords: function _getRemoveRecords() {
      return this.editStore.removeList;
    },

    /**
     * ??????????????????
     * ??????????????? row ?????????
     * ??????????????????????????????????????????????????????????????????????????????
     */
    _getUpdateRecords: function _getUpdateRecords() {
      var keepSource = this.keepSource,
          tableFullData = this.tableFullData,
          isUpdateByRow = this.isUpdateByRow,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts,
          editStore = this.editStore;

      if (keepSource) {
        var actived = editStore.actived;
        var row = actived.row,
            column = actived.column;

        if (row || column) {
          this._syncActivedCell();
        }

        if (treeConfig) {
          return _xeUtils.default.filterTree(tableFullData, function (row) {
            return isUpdateByRow(row);
          }, treeOpts);
        }

        return tableFullData.filter(function (row) {
          return isUpdateByRow(row);
        });
      }

      return [];
    },

    /**
     * ??????????????????
     */
    handleActived: function handleActived(params, evnt) {
      var _this7 = this;

      var editStore = this.editStore,
          editOpts = this.editOpts,
          tableColumn = this.tableColumn,
          editConfig = this.editConfig,
          mouseConfig = this.mouseConfig;
      var mode = editOpts.mode,
          activeMethod = editOpts.activeMethod;
      var actived = editStore.actived;
      var row = params.row,
          column = params.column;
      var editRender = column.editRender;
      var cell = params.cell = params.cell || this.getCell(row, column);

      if ((0, _utils.isEnableConf)(editConfig) && (0, _utils.isEnableConf)(editRender) && cell) {
        if (actived.row !== row || (mode === 'cell' ? actived.column !== column : false)) {
          // ????????????????????????
          var type = 'edit-disabled';

          if (!activeMethod || activeMethod(_objectSpread(_objectSpread({}, params), {}, {
            $table: this
          }))) {
            if (mouseConfig) {
              this.clearSelected(evnt);
              this.clearCellAreas(evnt);
              this.clearCopyCellArea(evnt);
            }

            this.closeTooltip();
            this.clearActived(evnt);
            type = 'edit-actived';
            column.renderHeight = cell.offsetHeight;
            actived.args = params;
            actived.row = row;
            actived.column = column;

            if (mode === 'row') {
              tableColumn.forEach(function (column) {
                return _this7._getColumnModel(row, column);
              });
            } else {
              this._getColumnModel(row, column);
            }

            this.$nextTick(function () {
              _this7.handleFocus(params, evnt);
            });
          }

          this.emitEvent(type, {
            row: row,
            rowIndex: this.getRowIndex(row),
            $rowIndex: this.getVMRowIndex(row),
            column: column,
            columnIndex: this.getColumnIndex(column),
            $columnIndex: this.getVMColumnIndex(column)
          }, evnt);
        } else {
          var oldColumn = actived.column;

          if (mouseConfig) {
            this.clearSelected(evnt);
            this.clearCellAreas(evnt);
            this.clearCopyCellArea(evnt);
          }

          if (oldColumn !== column) {
            var oldModel = oldColumn.model;

            if (oldModel.update) {
              _utils.default.setCellValue(row, oldColumn, oldModel.value);
            }

            this.clearValidate();
          }

          column.renderHeight = cell.offsetHeight;
          actived.args = params;
          actived.column = column;
          setTimeout(function () {
            _this7.handleFocus(params, evnt);
          });
        }

        this.focus();
      }

      return this.$nextTick();
    },
    _getColumnModel: function _getColumnModel(row, column) {
      var model = column.model,
          editRender = column.editRender;

      if (editRender) {
        model.value = _utils.default.getCellValue(row, column);
        model.update = false;
      }
    },
    _setColumnModel: function _setColumnModel(row, column) {
      var model = column.model,
          editRender = column.editRender;

      if (editRender && model.update) {
        _utils.default.setCellValue(row, column, model.value);

        model.update = false;
        model.value = null;
      }
    },
    _syncActivedCell: function _syncActivedCell() {
      var _this8 = this;

      var tableColumn = this.tableColumn,
          editStore = this.editStore,
          editOpts = this.editOpts;
      var actived = editStore.actived;
      var row = actived.row,
          column = actived.column;

      if (row || column) {
        if (editOpts.mode === 'row') {
          tableColumn.forEach(function (column) {
            return _this8._setColumnModel(row, column);
          });
        } else {
          this._setColumnModel(row, column);
        }
      }
    },

    /**
     * ?????????????????????
     */
    _clearActived: function _clearActived(evnt) {
      var editStore = this.editStore;
      var actived = editStore.actived;
      var row = actived.row,
          column = actived.column;

      if (row || column) {
        this._syncActivedCell();

        actived.args = null;
        actived.row = null;
        actived.column = null;
        this.updateFooter();
        this.emitEvent('edit-closed', {
          row: row,
          rowIndex: this.getRowIndex(row),
          $rowIndex: this.getVMRowIndex(row),
          column: column,
          columnIndex: this.getColumnIndex(column),
          $columnIndex: this.getVMColumnIndex(column)
        }, evnt);
      }

      return (_vXETable.default._valid ? this.clearValidate() : this.$nextTick()).then(this.recalculate);
    },
    _getActiveRecord: function _getActiveRecord() {
      var $el = this.$el,
          editStore = this.editStore,
          afterFullData = this.afterFullData;
      var actived = editStore.actived;
      var args = actived.args,
          row = actived.row;

      if (args && afterFullData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
        return Object.assign({}, args);
      }

      return null;
    },

    /**
     * ????????????????????????????????????
     * @param {Row} row ?????????
     */
    _isActiveByRow: function _isActiveByRow(row) {
      return this.editStore.actived.row === row;
    },

    /**
     * ????????????
     */
    handleFocus: function handleFocus(params) {
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var editRender = column.editRender;

      if ((0, _utils.isEnableConf)(editRender)) {
        var compRender = _vXETable.default.renderer.get(editRender.name);

        var autofocus = editRender.autofocus,
            autoselect = editRender.autoselect;
        var inputElem; // ????????????????????? class

        if (autofocus) {
          inputElem = cell.querySelector(autofocus);
        } // ????????????????????????


        if (!inputElem && compRender && compRender.autofocus) {
          inputElem = cell.querySelector(compRender.autofocus);
        }

        if (inputElem) {
          inputElem.focus();

          if (autoselect) {
            inputElem.select();
          } else {
            // ???????????????????????????????????????
            if (_dom.browse.msie) {
              var textRange = inputElem.createTextRange();
              textRange.collapse(false);
              textRange.select();
            }
          }
        } else {
          // ?????????????????????
          this.scrollToRow(row, column);
        }
      }
    },

    /**
     * ???????????????
     */
    _setActiveRow: function _setActiveRow(row) {
      return this.setActiveCell(row, _xeUtils.default.find(this.visibleColumn, function (column) {
        return (0, _utils.isEnableConf)(column.editRender);
      }));
    },

    /**
     * ?????????????????????
     */
    _setActiveCell: function _setActiveCell(row, fieldOrColumn) {
      var _this9 = this;

      var editConfig = this.editConfig;
      var column = _xeUtils.default.isString(fieldOrColumn) ? this.getColumnByField(fieldOrColumn) : fieldOrColumn;

      if (row && column && (0, _utils.isEnableConf)(editConfig) && (0, _utils.isEnableConf)(column.editRender)) {
        return this.scrollToRow(row, true).then(function () {
          var cell = _this9.getCell(row, column);

          if (cell) {
            _this9.handleActived({
              row: row,
              rowIndex: _this9.getRowIndex(row),
              column: column,
              columnIndex: _this9.getColumnIndex(column),
              cell: cell,
              $table: _this9
            });

            _this9.lastCallTime = Date.now();
          }
        });
      }

      return this.$nextTick();
    },

    /**
     * ?????? trigger=dblclick ????????????????????????
     */
    _setSelectCell: function _setSelectCell(row, fieldOrColumn) {
      var tableData = this.tableData,
          editOpts = this.editOpts,
          visibleColumn = this.visibleColumn;
      var column = _xeUtils.default.isString(fieldOrColumn) ? this.getColumnByField(fieldOrColumn) : fieldOrColumn;

      if (row && column && editOpts.trigger !== 'manual') {
        var rowIndex = tableData.indexOf(row);

        if (rowIndex > -1) {
          var cell = this.getCell(row, column);
          var params = {
            row: row,
            rowIndex: rowIndex,
            column: column,
            columnIndex: visibleColumn.indexOf(column),
            cell: cell
          };
          this.handleSelected(params, {});
        }
      }

      return this.$nextTick();
    },

    /**
     * ???????????????
     */
    handleSelected: function handleSelected(params, evnt) {
      var _this10 = this;

      var mouseConfig = this.mouseConfig,
          mouseOpts = this.mouseOpts,
          editOpts = this.editOpts,
          editStore = this.editStore;
      var actived = editStore.actived,
          selected = editStore.selected;
      var row = params.row,
          column = params.column;
      var isMouseSelected = mouseConfig && mouseOpts.selected;

      var selectMethod = function selectMethod() {
        if (isMouseSelected && (selected.row !== row || selected.column !== column)) {
          if (actived.row !== row || (editOpts.mode === 'cell' ? actived.column !== column : false)) {
            _this10.clearActived(evnt);

            _this10.clearSelected(evnt);

            _this10.clearCellAreas(evnt);

            _this10.clearCopyCellArea(evnt);

            selected.args = params;
            selected.row = row;
            selected.column = column;

            if (isMouseSelected) {
              _this10.addColSdCls();
            }

            _this10.focus();

            if (evnt) {
              _this10.emitEvent('cell-selected', params, evnt);
            }
          }
        }

        return _this10.$nextTick();
      };

      return selectMethod();
    },

    /**
     * ????????????????????????
     */
    _getSelectedCell: function _getSelectedCell() {
      var _this$editStore$selec = this.editStore.selected,
          args = _this$editStore$selec.args,
          column = _this$editStore$selec.column;

      if (args && column) {
        return Object.assign({}, args);
      }

      return null;
    },

    /**
     * ????????????????????????
     */
    _clearSelected: function _clearSelected() {
      var selected = this.editStore.selected;
      selected.row = null;
      selected.column = null;
      this.reColTitleSdCls();
      this.reColSdCls();
      return this.$nextTick();
    },
    reColTitleSdCls: function reColTitleSdCls() {
      var headerElem = this.elemStore['main-header-list'];

      if (headerElem) {
        _xeUtils.default.arrayEach(headerElem.querySelectorAll('.col--title-selected'), function (elem) {
          return _dom.default.removeClass(elem, 'col--title-selected');
        });
      }
    },
    reColSdCls: function reColSdCls() {
      var cell = this.$el.querySelector('.col--selected');

      if (cell) {
        _dom.default.removeClass(cell, 'col--selected');
      }
    },
    addColSdCls: function addColSdCls() {
      var selected = this.editStore.selected;
      var row = selected.row,
          column = selected.column;
      this.reColSdCls();

      if (row && column) {
        var cell = this.getCell(row, column);

        if (cell) {
          _dom.default.addClass(cell, 'col--selected');
        }
      }
    }
  }
};
exports.default = _default;