"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../v-x-e-table/src/conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _size = _interopRequireDefault(require("../../mixins/size"));

var _utils = _interopRequireDefault(require("../../tools/utils"));

var _dom = _interopRequireDefault(require("../../tools/dom"));

var _event = require("../../tools/event");

var _log = require("../../tools/log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var renderDropdowns = function renderDropdowns(h, _vm, item, isBtn) {
  var _e = _vm._e;
  var dropdowns = item.dropdowns;

  if (dropdowns) {
    return dropdowns.map(function (child) {
      return child.visible === false ? _e() : h('vxe-button', {
        on: {
          click: function click(evnt) {
            return isBtn ? _vm.btnEvent(evnt, child) : _vm.tolEvent(evnt, child);
          }
        },
        props: {
          disabled: child.disabled,
          loading: child.loading,
          type: child.type,
          icon: child.icon,
          circle: child.circle,
          round: child.round,
          status: child.status,
          content: child.name
        }
      });
    });
  }

  return [];
};
/**
 * 渲染按钮
 */


function renderBtns(h, _vm) {
  var _e = _vm._e,
      $scopedSlots = _vm.$scopedSlots,
      $xegrid = _vm.$xegrid,
      $xetable = _vm.$xetable,
      _vm$buttons = _vm.buttons,
      buttons = _vm$buttons === void 0 ? [] : _vm$buttons;
  var buttonsSlot = $scopedSlots.buttons;

  if (buttonsSlot) {
    return buttonsSlot.call(_vm, {
      $grid: $xegrid,
      $table: $xetable
    }, h);
  }

  return buttons.map(function (item) {
    var dropdowns = item.dropdowns,
        buttonRender = item.buttonRender;
    var compConf = buttonRender ? _vXETable.default.renderer.get(buttonRender.name) : null;

    if (item.visible === false) {
      return _e();
    }

    if (compConf) {
      var renderToolbarButton = compConf.renderToolbarButton || compConf.renderButton;

      if (renderToolbarButton) {
        return h('span', {
          class: 'vxe-button--item'
        }, renderToolbarButton.call(_vm, h, buttonRender, {
          $grid: $xegrid,
          $table: $xetable,
          button: item
        }));
      }
    }

    return h('vxe-button', {
      on: {
        click: function click(evnt) {
          return _vm.btnEvent(evnt, item);
        }
      },
      props: {
        disabled: item.disabled,
        loading: item.loading,
        type: item.type,
        icon: item.icon,
        circle: item.circle,
        round: item.round,
        status: item.status,
        content: item.name,
        destroyOnClose: item.destroyOnClose,
        placement: item.placement,
        transfer: item.transfer
      },
      scopedSlots: dropdowns && dropdowns.length ? {
        dropdowns: function dropdowns() {
          return renderDropdowns(h, _vm, item, true);
        }
      } : null
    });
  });
}
/**
 * 渲染右侧工具
 */


function renderRightTools(h, _vm) {
  var _e = _vm._e,
      $scopedSlots = _vm.$scopedSlots,
      $xegrid = _vm.$xegrid,
      $xetable = _vm.$xetable,
      _vm$tools = _vm.tools,
      tools = _vm$tools === void 0 ? [] : _vm$tools;
  var toolsSlot = $scopedSlots.tools;

  if (toolsSlot) {
    return toolsSlot.call(_vm, {
      $grid: $xegrid,
      $table: $xetable
    }, h);
  }

  return tools.map(function (item) {
    var dropdowns = item.dropdowns,
        toolRender = item.toolRender;
    var compConf = toolRender ? _vXETable.default.renderer.get(toolRender.name) : null;

    if (item.visible === false) {
      return _e();
    }

    if (compConf) {
      var renderToolbarTool = compConf.renderToolbarTool;

      if (renderToolbarTool) {
        return h('span', {
          class: 'vxe-tool--item'
        }, renderToolbarTool.call(_vm, h, toolRender, {
          $grid: $xegrid,
          $table: $xetable,
          tool: item
        }));
      }
    }

    return h('vxe-button', {
      on: {
        click: function click(evnt) {
          return _vm.tolEvent(evnt, item);
        }
      },
      props: {
        disabled: item.disabled,
        loading: item.loading,
        type: item.type,
        icon: item.icon,
        circle: item.circle,
        round: item.round,
        status: item.status,
        content: item.name,
        destroyOnClose: item.destroyOnClose,
        placement: item.placement,
        transfer: item.transfer
      },
      scopedSlots: dropdowns && dropdowns.length ? {
        dropdowns: function dropdowns() {
          return renderDropdowns(h, _vm, item, false);
        }
      } : null
    });
  });
}

function renderCustoms(h, _vm) {
  var $xetable = _vm.$xetable,
      customStore = _vm.customStore,
      customOpts = _vm.customOpts,
      columns = _vm.columns;
  var cols = [];
  var customBtnOns = {};
  var customWrapperOns = {};
  var checkMethod = $xetable ? $xetable.customOpts.checkMethod : null;

  if (customOpts.trigger === 'manual') {// 手动触发
  } else if (customOpts.trigger === 'hover') {
    // hover 触发
    customBtnOns.mouseenter = _vm.handleMouseenterSettingEvent;
    customBtnOns.mouseleave = _vm.handleMouseleaveSettingEvent;
    customWrapperOns.mouseenter = _vm.handleWrapperMouseenterEvent;
    customWrapperOns.mouseleave = _vm.handleWrapperMouseleaveEvent;
  } else {
    // 点击触发
    customBtnOns.click = _vm.handleClickSettingEvent;
  }

  _xeUtils.default.eachTree(columns, function (column) {
    var colTitle = _utils.default.formatText(column.getTitle(), 1);

    var colKey = column.getKey();
    var isColGroup = column.children && column.children.length;
    var isDisabled = checkMethod ? !checkMethod({
      column: column
    }) : false;

    if (isColGroup || colKey) {
      cols.push(h('li', {
        class: ['vxe-custom--option', "level--".concat(column.level), {
          'is--group': isColGroup,
          'is--checked': column.visible,
          'is--indeterminate': column.halfVisible,
          'is--disabled': isDisabled
        }],
        attrs: {
          title: colTitle
        },
        on: {
          click: function click() {
            if (!isDisabled) {
              _vm.changeCustomOption(column);
            }
          }
        }
      }, [h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
      }), h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
      }), h('span', {
        class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
      }), h('span', {
        class: 'vxe-checkbox--label'
      }, colTitle)]));
    }
  });

  return h('div', {
    class: ['vxe-custom--wrapper', {
      'is--active': customStore.visible
    }],
    ref: 'customWrapper'
  }, [h('vxe-button', {
    props: {
      circle: true,
      icon: customOpts.icon || _conf.default.icon.TOOLBAR_TOOLS_CUSTOM
    },
    attrs: {
      title: _conf.default.i18n('vxe.toolbar.custom')
    },
    on: customBtnOns
  }), h('div', {
    class: 'vxe-custom--option-wrapper'
  }, [h('ul', {
    class: 'vxe-custom--header'
  }, [h('li', {
    class: ['vxe-custom--option', {
      'is--checked': customStore.isAll,
      'is--indeterminate': customStore.isIndeterminate
    }],
    attrs: {
      title: _conf.default.i18n('vxe.table.allTitle')
    },
    on: {
      click: _vm.allCustomEvent
    }
  }, [h('span', {
    class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
  }), h('span', {
    class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
  }), h('span', {
    class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
  }), h('span', {
    class: 'vxe-checkbox--label'
  }, _conf.default.i18n('vxe.toolbar.customAll'))])]), h('ul', {
    class: 'vxe-custom--body',
    on: customWrapperOns
  }, cols), customOpts.isFooter === false ? null : h('div', {
    class: 'vxe-custom--footer'
  }, [h('button', {
    class: 'btn--confirm',
    on: {
      click: _vm.confirmCustomEvent
    }
  }, _conf.default.i18n('vxe.toolbar.customConfirm')), h('button', {
    class: 'btn--reset',
    on: {
      click: _vm.resetCustomEvent
    }
  }, _conf.default.i18n('vxe.toolbar.customRestore'))])])]);
}

var _default2 = {
  name: 'VxeToolbar',
  mixins: [_size.default],
  props: {
    loading: Boolean,
    refresh: [Boolean, Object],
    import: [Boolean, Object],
    export: [Boolean, Object],
    print: [Boolean, Object],
    zoom: [Boolean, Object],
    custom: [Boolean, Object],
    buttons: {
      type: Array,
      default: function _default() {
        return _conf.default.toolbar.buttons;
      }
    },
    tools: {
      type: Array,
      default: function _default() {
        return _conf.default.toolbar.tools;
      }
    },
    perfect: {
      type: Boolean,
      default: function _default() {
        return _conf.default.toolbar.perfect;
      }
    },
    size: {
      type: String,
      default: function _default() {
        return _conf.default.toolbar.size || _conf.default.size;
      }
    },
    className: [String, Function]
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  data: function data() {
    return {
      $xetable: null,
      isRefresh: false,
      columns: [],
      customStore: {
        isAll: false,
        isIndeterminate: false,
        visible: false
      }
    };
  },
  computed: {
    refreshOpts: function refreshOpts() {
      return Object.assign({}, _conf.default.toolbar.refresh, this.refresh);
    },
    importOpts: function importOpts() {
      return Object.assign({}, _conf.default.toolbar.import, this.import);
    },
    exportOpts: function exportOpts() {
      return Object.assign({}, _conf.default.toolbar.export, this.export);
    },
    printOpts: function printOpts() {
      return Object.assign({}, _conf.default.toolbar.print, this.print);
    },
    zoomOpts: function zoomOpts() {
      return Object.assign({}, _conf.default.toolbar.zoom, this.zoom);
    },
    customOpts: function customOpts() {
      return Object.assign({}, _conf.default.toolbar.custom, this.custom);
    }
  },
  created: function created() {
    var _this = this;

    var refresh = this.refresh,
        refreshOpts = this.refreshOpts;
    this.$nextTick(function () {
      var $xetable = _this.fintTable();

      if (refresh && !_this.$xegrid && !refreshOpts.query) {
        (0, _log.warnLog)('vxe.error.notFunc', ['query']);
      }

      if ($xetable) {
        $xetable.connect(_this);
      }

      if (process.env.NODE_ENV === 'development') {
        if (_this.buttons) {
          _this.buttons.forEach(function (item) {
            var buttonRender = item.buttonRender;
            var compConf = buttonRender ? _vXETable.default.renderer.get(buttonRender.name) : null;

            if (compConf && compConf.renderButton) {
              (0, _log.warnLog)('vxe.error.delFunc', ['renderButton', 'renderToolbarButton']);
            }
          });
        }
      }
    });

    _event.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _event.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },
  destroyed: function destroyed() {
    _event.GlobalEvent.off(this, 'mousedown');

    _event.GlobalEvent.off(this, 'blur');
  },
  render: function render(h) {
    var _ref;

    var _e = this._e,
        $xegrid = this.$xegrid,
        perfect = this.perfect,
        loading = this.loading,
        importOpts = this.importOpts,
        exportOpts = this.exportOpts,
        refresh = this.refresh,
        refreshOpts = this.refreshOpts,
        zoom = this.zoom,
        zoomOpts = this.zoomOpts,
        custom = this.custom,
        vSize = this.vSize,
        className = this.className;
    return h('div', {
      class: ['vxe-toolbar', className ? _xeUtils.default.isFunction(className) ? className({
        $toolbar: this
      }) : className : '', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--perfect', perfect), _defineProperty(_ref, 'is--loading', loading), _ref)]
    }, [h('div', {
      class: 'vxe-buttons--wrapper'
    }, renderBtns(h, this)), h('div', {
      class: 'vxe-tools--wrapper'
    }, renderRightTools(h, this)), h('div', {
      class: 'vxe-tools--operate'
    }, [this.import ? h('vxe-button', {
      props: {
        circle: true,
        icon: importOpts.icon || _conf.default.icon.TOOLBAR_TOOLS_IMPORT
      },
      attrs: {
        title: _conf.default.i18n('vxe.toolbar.import')
      },
      on: {
        click: this.importEvent
      }
    }) : _e(), this.export ? h('vxe-button', {
      props: {
        circle: true,
        icon: exportOpts.icon || _conf.default.icon.TOOLBAR_TOOLS_EXPORT
      },
      attrs: {
        title: _conf.default.i18n('vxe.toolbar.export')
      },
      on: {
        click: this.exportEvent
      }
    }) : _e(), this.print ? h('vxe-button', {
      props: {
        circle: true,
        icon: this.printOpts.icon || _conf.default.icon.TOOLBAR_TOOLS_PRINT
      },
      attrs: {
        title: _conf.default.i18n('vxe.toolbar.print')
      },
      on: {
        click: this.printEvent
      }
    }) : _e(), refresh ? h('vxe-button', {
      props: {
        circle: true,
        icon: this.isRefresh ? refreshOpts.iconLoading || _conf.default.icon.TOOLBAR_TOOLS_REFRESH_LOADING : refreshOpts.icon || _conf.default.icon.TOOLBAR_TOOLS_REFRESH
      },
      attrs: {
        title: _conf.default.i18n('vxe.toolbar.refresh')
      },
      on: {
        click: this.refreshEvent
      }
    }) : _e(), zoom && $xegrid ? h('vxe-button', {
      props: {
        circle: true,
        icon: $xegrid.isMaximized() ? zoomOpts.iconOut || _conf.default.icon.TOOLBAR_TOOLS_ZOOM_OUT : zoomOpts.iconIn || _conf.default.icon.TOOLBAR_TOOLS_ZOOM_IN
      },
      attrs: {
        title: _conf.default.i18n("vxe.toolbar.zoom".concat($xegrid.isMaximized() ? 'Out' : 'In'))
      },
      on: {
        click: $xegrid.triggerZoomEvent
      }
    }) : _e(), custom ? renderCustoms(h, this) : _e()])]);
  },
  methods: {
    syncUpdate: function syncUpdate(params) {
      var collectColumn = params.collectColumn,
          $table = params.$table;
      this.$xetable = $table;
      this.columns = collectColumn;
    },
    fintTable: function fintTable() {
      var $children = this.$parent.$children;
      var selfIndex = $children.indexOf(this);
      return _xeUtils.default.find($children, function (comp, index) {
        return comp && comp.loadData && index > selfIndex && comp.$vnode.componentOptions.tag === 'vxe-table';
      });
    },
    checkTable: function checkTable() {
      if (this.$xetable) {
        return true;
      }

      (0, _log.errLog)('vxe.error.barUnableLink');
    },
    showCustom: function showCustom() {
      this.customStore.visible = true;
      this.checkCustomStatus();
    },
    closeCustom: function closeCustom() {
      var custom = this.custom,
          customStore = this.customStore;

      if (customStore.visible) {
        customStore.visible = false;

        if (custom && !customStore.immediate) {
          this.handleTableCustom();
        }
      }
    },
    confirmCustomEvent: function confirmCustomEvent(evnt) {
      this.closeCustom();
      this.emitCustomEvent('confirm', evnt);
    },
    customOpenEvent: function customOpenEvent(evnt) {
      var customStore = this.customStore;

      if (this.checkTable()) {
        if (!customStore.visible) {
          this.showCustom();
          this.emitCustomEvent('open', evnt);
        }
      }
    },
    customColseEvent: function customColseEvent(evnt) {
      var customStore = this.customStore;

      if (customStore.visible) {
        this.closeCustom();
        this.emitCustomEvent('close', evnt);
      }
    },
    resetCustomEvent: function resetCustomEvent(evnt) {
      var $xetable = this.$xetable,
          columns = this.columns;
      var checkMethod = $xetable.customOpts.checkMethod;

      _xeUtils.default.eachTree(columns, function (column) {
        if (!checkMethod || checkMethod({
          column: column
        })) {
          column.visible = column.defaultVisible;
          column.halfVisible = false;
        }

        column.resizeWidth = 0;
      });

      $xetable.saveCustomResizable(true);
      this.closeCustom();
      this.emitCustomEvent('reset', evnt);
    },
    emitCustomEvent: function emitCustomEvent(type, evnt) {
      var $xetable = this.$xetable,
          $xegrid = this.$xegrid;
      var comp = $xegrid || $xetable;
      comp.$emit('custom', {
        type: type,
        $table: $xetable,
        $grid: $xegrid,
        $event: evnt
      });
    },
    changeCustomOption: function changeCustomOption(column) {
      var isChecked = !column.visible;

      _xeUtils.default.eachTree([column], function (item) {
        item.visible = isChecked;
        item.halfVisible = false;
      });

      this.handleOptionCheck(column);

      if (this.custom && this.customOpts.immediate) {
        this.handleTableCustom();
      }

      this.checkCustomStatus();
    },
    handleOptionCheck: function handleOptionCheck(column) {
      var matchObj = _xeUtils.default.findTree(this.columns, function (item) {
        return item === column;
      });

      if (matchObj && matchObj.parent) {
        var parent = matchObj.parent;

        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every(function (column) {
            return column.visible;
          });
          parent.halfVisible = !parent.visible && parent.children.some(function (column) {
            return column.visible || column.halfVisible;
          });
          this.handleOptionCheck(parent);
        }
      }
    },
    handleTableCustom: function handleTableCustom() {
      var $xetable = this.$xetable;
      $xetable.handleCustom();
    },
    checkCustomStatus: function checkCustomStatus() {
      var $xetable = this.$xetable,
          columns = this.columns;
      var checkMethod = $xetable.customOpts.checkMethod;
      this.customStore.isAll = columns.every(function (column) {
        return (checkMethod ? !checkMethod({
          column: column
        }) : false) || column.visible;
      });
      this.customStore.isIndeterminate = !this.customStore.isAll && columns.some(function (column) {
        return (!checkMethod || checkMethod({
          column: column
        })) && (column.visible || column.halfVisible);
      });
    },
    allCustomEvent: function allCustomEvent() {
      var $xetable = this.$xetable,
          columns = this.columns,
          customStore = this.customStore;
      var checkMethod = $xetable.customOpts.checkMethod;
      var isAll = !customStore.isAll;

      _xeUtils.default.eachTree(columns, function (column) {
        if (!checkMethod || checkMethod({
          column: column
        })) {
          column.visible = isAll;
          column.halfVisible = false;
        }
      });

      customStore.isAll = isAll;
      this.checkCustomStatus();
    },
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      if (!_dom.default.getEventTargetNode(evnt, this.$refs.customWrapper).flag) {
        this.customColseEvent(evnt);
      }
    },
    handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
      this.customColseEvent(evnt);
    },
    handleClickSettingEvent: function handleClickSettingEvent(evnt) {
      if (this.customStore.visible) {
        this.customColseEvent(evnt);
      } else {
        this.customOpenEvent(evnt);
      }
    },
    handleMouseenterSettingEvent: function handleMouseenterSettingEvent(evnt) {
      this.customStore.activeBtn = true;
      this.customOpenEvent(evnt);
    },
    handleMouseleaveSettingEvent: function handleMouseleaveSettingEvent(evnt) {
      var _this2 = this;

      var customStore = this.customStore;
      customStore.activeBtn = false;
      setTimeout(function () {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          _this2.customColseEvent(evnt);
        }
      }, 300);
    },
    handleWrapperMouseenterEvent: function handleWrapperMouseenterEvent(evnt) {
      this.customStore.activeWrapper = true;
      this.customOpenEvent(evnt);
    },
    handleWrapperMouseleaveEvent: function handleWrapperMouseleaveEvent(evnt) {
      var _this3 = this;

      var customStore = this.customStore;
      customStore.activeWrapper = false;
      setTimeout(function () {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          _this3.customColseEvent(evnt);
        }
      }, 300);
    },
    refreshEvent: function refreshEvent() {
      var _this4 = this;

      var $xegrid = this.$xegrid,
          refreshOpts = this.refreshOpts,
          isRefresh = this.isRefresh;

      if (!isRefresh) {
        if (refreshOpts.query) {
          this.isRefresh = true;

          try {
            Promise.resolve(refreshOpts.query()).catch(function (e) {
              return e;
            }).then(function () {
              _this4.isRefresh = false;
            });
          } catch (e) {
            this.isRefresh = false;
          }
        } else if ($xegrid) {
          this.isRefresh = true;
          $xegrid.commitProxy('reload').catch(function (e) {
            return e;
          }).then(function () {
            _this4.isRefresh = false;
          });
        }
      }
    },
    btnEvent: function btnEvent(evnt, item) {
      var $xegrid = this.$xegrid,
          $xetable = this.$xetable;
      var code = item.code;

      if (code) {
        if ($xegrid) {
          $xegrid.triggerToolbarBtnEvent(item, evnt);
        } else {
          var commandMethod = _vXETable.default.commands.get(code);

          var params = {
            code: code,
            button: item,
            $xegrid: $xegrid,
            $table: $xetable,
            $event: evnt
          };

          if (commandMethod) {
            commandMethod.call(this, params, evnt);
          }

          this.$emit('button-click', params);
        }
      }
    },
    tolEvent: function tolEvent(evnt, item) {
      var $xegrid = this.$xegrid,
          $xetable = this.$xetable;
      var code = item.code;

      if (code) {
        if ($xegrid) {
          $xegrid.triggerToolbarTolEvent(item, evnt);
        } else {
          var commandMethod = _vXETable.default.commands.get(code);

          var params = {
            code: code,
            tool: item,
            $xegrid: $xegrid,
            $table: $xetable,
            $event: evnt
          };

          if (commandMethod) {
            commandMethod.call(this, params, evnt);
          }

          this.$emit('tool-click', params);
        }
      }
    },
    importEvent: function importEvent() {
      if (this.checkTable()) {
        this.$xetable.openImport(this.importOpts);
      }
    },
    exportEvent: function exportEvent() {
      if (this.checkTable()) {
        this.$xetable.openExport(this.exportOpts);
      }
    },
    printEvent: function printEvent() {
      if (this.checkTable()) {
        this.$xetable.openPrint(this.printOpts);
      }
    }
  }
};
exports.default = _default2;