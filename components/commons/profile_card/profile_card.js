"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileCard = exports.ProfileCardContext = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactJss = require("react-jss");

var _reactSpring = require("react-spring");

var _useDebounce3 = require("use-debounce");

var _ui = require("@wld/ui");

var _profile_card_side = require("./profile_card_side/profile_card_side");

var _profile_card_edit_button = require("./profile_card_edit_button/profile_card_edit_button");

var _profile_card_edit_dialog = require("./profile_card_edit_dialog/profile_card_edit_dialog");

var _profile_card_incomplete_popper = require("./profile_card_incomplete_popper/profile_card_incomplete_popper");

var _profile_card_actions_types = require("../../../store/profile_card/profile_card_actions_types");

var _profile_card_reducer = require("../../../store/profile_card/profile_card_reducer");

var _use_callback_open = require("../../hooks/use_callback_open");

var _profile_card_styles = require("./profile_card_styles");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useStyles = (0, _reactJss.createUseStyles)(_profile_card_styles.styles);
var ProfileCardContext = (0, _react.createContext)({});
exports.ProfileCardContext = ProfileCardContext;
var DEFAULT_TRANSITIONS_SPRING_PROPS = {
  from: {
    opacity: 0
  },
  enter: {
    opacity: 1
  },
  leave: {
    opacity: 0
  },
  config: _reactSpring.config.default
};

var ProfileCardComponent = function ProfileCardComponent(_ref) {
  var children = _ref.children,
      data = _ref.data,
      sides = _ref.sides,
      variant = _ref.variant,
      _ref$isTransitionUniq = _ref.isTransitionUnique,
      isTransitionUnique = _ref$isTransitionUniq === void 0 ? true : _ref$isTransitionUniq,
      isEditingProfile = _ref.isEditingProfile,
      editDialog = _ref.editDialog,
      customTransitionsSpringProps = _ref.customTransitionsSpringProps,
      customEditAction = _ref.customEditAction,
      _ref$isComplete = _ref.isComplete,
      isComplete = _ref$isComplete === void 0 ? true : _ref$isComplete,
      sideProps = _ref.side;
  var classes = useStyles({
    variant: variant
  });

  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      containerElement = _useState2[0],
      setContainerElement = _useState2[1];

  var containerReference = (0, _react.useRef)();

  var _useCallbackOpen = (0, _use_callback_open.useCallbackOpen)(),
      _useCallbackOpen2 = (0, _slicedToArray2.default)(_useCallbackOpen, 3),
      openEditDialog = _useCallbackOpen2[0],
      setEditDialogOpened = _useCallbackOpen2[1],
      setEditDialogClosed = _useCallbackOpen2[2];

  var _useReducer = (0, _react.useReducer)(_profile_card_reducer.profileCardReducer, (0, _profile_card_reducer.getProfileCardInitialState)({
    variant: variant,
    side: sideProps
  })),
      _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var side = state.side,
      hasDialogOpened = state.hasDialogOpened;

  var _useDebounce = (0, _useDebounce3.useDebounce)(side, 200),
      _useDebounce2 = (0, _slicedToArray2.default)(_useDebounce, 1),
      debouncedSide = _useDebounce2[0];

  (0, _react.useEffect)(function () {
    setContainerElement(containerReference.current);
  }, []);
  var transitionsSpringProps = (0, _react.useMemo)(function () {
    if (customTransitionsSpringProps) {
      if (typeof customTransitionsSpringProps === 'function') {
        return customTransitionsSpringProps(side);
      }

      return customTransitionsSpringProps;
    }

    return DEFAULT_TRANSITIONS_SPRING_PROPS;
  }, [customTransitionsSpringProps, side]);
  var hasSideChanged = (0, _react.useRef)(false);
  var setSide = (0, _react.useCallback)(function (newSide) {
    return dispatch({
      type: _profile_card_actions_types.SET_SIDE,
      side: newSide
    });
  }, []);
  var handleMouseEnter = (0, _react.useCallback)(function () {
    return setSide('back');
  }, [dispatch]);
  var handleMouseLeave = (0, _react.useCallback)(function () {
    if (hasDialogOpened) {
      return;
    }

    setSide('front');
  }, [hasDialogOpened, dispatch]);
  (0, _react.useEffect)(function () {
    if (hasSideChanged.current) {
      return;
    }

    hasSideChanged.current = true;
  }, [side]);
  var transitions = (0, _reactSpring.useTransition)(debouncedSide, function (item) {
    return "card_side_".concat(item);
  }, _objectSpread({}, transitionsSpringProps, {
    unique: isTransitionUnique,
    immediate: !hasSideChanged.current
  }));
  var contextData = (0, _react.useMemo)(function () {
    return {
      state: state,
      dispatch: dispatch
    };
  }, [state]);
  return _react.default.createElement(_react.default.Fragment, null, isEditingProfile && !customEditAction && _react.default.createElement(_profile_card_edit_dialog.ProfileCardEditDialog, {
    editDialog: editDialog,
    open: openEditDialog,
    onClose: setEditDialogClosed,
    data: data
  }), _react.default.createElement(_profile_card_incomplete_popper.ProfileCardIncompletePopper, {
    open: isComplete !== true,
    anchorElement: containerElement
  }), _react.default.createElement(_ui.Card, {
    containerRef: containerReference,
    customClasses: {
      container: classes.container
    },
    elevation: 1,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, isEditingProfile && _react.default.createElement(EditAction, {
    customEditAction: customEditAction,
    setEditDialogOpened: setEditDialogOpened
  }), _react.default.createElement(ProfileCardContext.Provider, {
    value: contextData
  }, children, transitions.map(function (_ref2) {
    var item = _ref2.item,
        key = _ref2.key,
        props = _ref2.props;

    var SideComponent = sides[item] || function () {
      return null;
    };

    return _react.default.createElement(_profile_card_side.ProfileCardSide, {
      key: key,
      style: props
    }, _react.default.createElement(SideComponent, {
      data: data
    }));
  }))));
};

var EditAction = function EditAction(_ref3) {
  var customEditAction = _ref3.customEditAction,
      setEditDialogOpened = _ref3.setEditDialogOpened;

  if (customEditAction) {
    return customEditAction;
  }

  return _react.default.createElement(_profile_card_edit_button.ProfileCardEditButton, {
    setEditDialogOpened: setEditDialogOpened
  });
};

var ProfileCard = ProfileCardComponent;
exports.ProfileCard = ProfileCard;