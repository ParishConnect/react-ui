import { css } from '@emotion/core'
import tinycolor from 'tinycolor2'
import { ThemeType } from '../../constants/index'

export const generateStyles = (theme: ThemeType) => css`
  .filepond--assistant {
    position: absolute;
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* Hard to override styles */
  .filepond--browser.filepond--browser {
    position: absolute;
    margin: 0;
    padding: 0;
    left: 1em;
    top: 1.75em;
    width: calc(100% - 2em);
    opacity: 0;
    font-size: 0;
  }

  .filepond--label-action {
    ${theme.getButtonCSS('primary', 'default', theme.themeColor)};
    ${theme.getTextStyle(theme.getTextSizeForControlHeight(20))};
    border-radius: ${theme.getBorderRadiusForControlHeight(32)}px;
    height: 32px;
    align-items: center;
    font-weight: 500;
    display: inline-flex;
    flex-wrap: no-wrap;
    margin: 0;
    margin-left: 8px;
    padding: 0 16px;
  }

  .filepond--drip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    opacity: 0.1;
    pointer-events: none;
    border-radius: 0.5em;
    background: rgba(0, 0, 0, 0.01);
  }

  .filepond--drip-blob {
    position: absolute;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    top: 0;
    left: 0;
    width: 8em;
    height: 8em;
    margin-left: -4em;
    margin-top: -4em;
    background: #292625;
    border-radius: 50%;
    will-change: transform, opacity;
  }

  .filepond--drop-label {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: 0;
    color: #4f4f4f;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    will-change: transform, opacity;
  }

  /* Hard to override styles on purpose */
  .filepond--drop-label.filepond--drop-label label {
    display: block;
    margin: 0;
    padding: 0.5em;
  }

  .filepond--drop-label label {
    cursor: default;
    font-size: 0.875em;
    font-weight: normal;
    text-align: center;
    line-height: 1.5;
  }

  .filepond--root[data-disabled] .filepond--drop-label label {
    opacity: 0.5;
  }

  /* Hard to override styles */
  .filepond--file-action-button.filepond--file-action-button {
    font-size: 1em;
    width: 1.625em;
    height: 1.625em;
    font-family: inherit;
    line-height: inherit;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    will-change: transform, opacity;
  }
  .filepond--file-action-button.filepond--file-action-button span {
    position: absolute;
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .filepond--file-action-button.filepond--file-action-button svg {
    width: 100%;
    height: 100%;
  }
  .filepond--file-action-button.filepond--file-action-button::after {
    position: absolute;
    left: -0.75em;
    right: -0.75em;
    top: -0.75em;
    bottom: -0.75em;
    content: '';
  }

  /* Soft styles */
  .filepond--file-action-button {
    cursor: auto;
    color: #fff;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    background-image: none;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    transition: box-shadow 0.25s ease-in;
  }
  .filepond--file-action-button:hover,
  .filepond--file-action-button:focus {
    box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.9);
  }
  .filepond--file-action-button[disabled] {
    color: rgba(255, 255, 255, 0.5);
    background-color: rgba(0, 0, 0, 0.25);
  }

  .filepond--file-info {
    position: static;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    margin: 0 0.5em 0 0;
    min-width: 0;
    will-change: transform, opacity;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .filepond--file-info * {
    margin: 0;
  }
  .filepond--file-info .filepond--file-info-main {
    font-size: 0.75em;
    line-height: 1.2;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }
  .filepond--file-info .filepond--file-info-sub {
    font-size: 0.625em;
    opacity: 0.5;
    transition: opacity 0.25s ease-in-out;
    white-space: nowrap;
  }
  .filepond--file-info .filepond--file-info-sub:empty {
    display: none;
  }

  .filepond--file-status {
    position: static;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-grow: 0;
    flex-shrink: 0;
    margin: 0;
    min-width: 2.25em;
    text-align: right;
    will-change: transform, opacity;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .filepond--file-status * {
    margin: 0;
    white-space: nowrap;
  }
  .filepond--file-status .filepond--file-status-main {
    font-size: 0.75em;
    line-height: 1.2;
  }
  .filepond--file-status .filepond--file-status-sub {
    font-size: 0.625em;
    opacity: 0.5;
    transition: opacity 0.25s ease-in-out;
  }

  /* Hard to override styles */
  .filepond--file-wrapper.filepond--file-wrapper {
    border: none;
    margin: 0;
    padding: 0;
    min-width: 0;
    height: 100%;
  }
  .filepond--file-wrapper.filepond--file-wrapper > legend {
    position: absolute;
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .filepond--file {
    position: static;
    display: flex;
    height: 100%;
    align-items: flex-start;
    padding: 0.5625em 0.5625em;
    color: #fff;
    border-radius: 0.5em;
  }
  .filepond--file .filepond--file-status {
    margin-left: auto;
    margin-right: 2.25em;
  }
  .filepond--file .filepond--processing-complete-indicator {
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 3;
  }
  .filepond--file .filepond--processing-complete-indicator,
  .filepond--file .filepond--progress-indicator,
  .filepond--file .filepond--file-action-button {
    position: absolute;
  }
  .filepond--file [data-align*='left'] {
    left: 0.5625em;
  }
  .filepond--file [data-align*='right'] {
    right: 0.5625em;
  }
  .filepond--file [data-align*='center'] {
    left: calc(50% - 0.8125em);
  }
  .filepond--file [data-align*='bottom'] {
    bottom: 1.125em;
  }
  .filepond--file [data-align='center'] {
    top: calc(50% - 0.8125em);
  }
  .filepond--file .filepond--progress-indicator {
    margin-top: 0.1875em;
  }
  .filepond--file .filepond--progress-indicator[data-align*='right'] {
    margin-right: 0.1875em;
  }
  .filepond--file .filepond--progress-indicator[data-align*='left'] {
    margin-left: 0.1875em;
  }

  [data-filepond-item-state='cancelled'] .filepond--file-info,
  [data-filepond-item-state*='invalid'] .filepond--file-info,
  [data-filepond-item-state*='error'] .filepond--file-info {
    margin-right: 2.25em;
  }

  [data-filepond-item-state='processing-complete']
    .filepond--action-revert-item-processing
    svg {
    -webkit-animation: fall 0.5s 0.125s linear both;
    animation: fall 0.5s 0.125s linear both;
  }

  [data-filepond-item-state='processing-complete'] .filepond--file-info-sub,
  [data-filepond-item-state='processing-complete'] .filepond--file-status-sub {
    opacity: 0;
  }

  [data-filepond-item-state='processing-complete']
    .filepond--action-revert-item-processing
    ~ .filepond--file-info
    .filepond--file-info-sub,
  [data-filepond-item-state='processing-complete']
    .filepond--action-revert-item-processing
    ~ .filepond--file-status
    .filepond--file-status-sub {
    opacity: 0.5;
  }

  [data-filepond-item-state*='invalid'] .filepond--panel,
  [data-filepond-item-state*='invalid'] .filepond--file-wrapper,
  [data-filepond-item-state*='error'] .filepond--panel,
  [data-filepond-item-state*='error'] .filepond--file-wrapper {
    -webkit-animation: shake 0.65s linear both;
    animation: shake 0.65s linear both;
  }

  [data-filepond-item-state*='busy'] .filepond--progress-indicator svg {
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
  }

  /**
 * States
 */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
    }
    100% {
      -webkit-transform: rotateZ(360deg);
      transform: rotateZ(360deg);
    }
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotateZ(0deg);
      transform: rotateZ(0deg);
    }
    100% {
      -webkit-transform: rotateZ(360deg);
      transform: rotateZ(360deg);
    }
  }

  @-webkit-keyframes shake {
    10%,
    90% {
      -webkit-transform: translateX(-0.0625em);
      transform: translateX(-0.0625em);
    }
    20%,
    80% {
      -webkit-transform: translateX(0.125em);
      transform: translateX(0.125em);
    }
    30%,
    50%,
    70% {
      -webkit-transform: translateX(-0.25em);
      transform: translateX(-0.25em);
    }
    40%,
    60% {
      -webkit-transform: translateX(0.25em);
      transform: translateX(0.25em);
    }
  }

  @keyframes shake {
    10%,
    90% {
      -webkit-transform: translateX(-0.0625em);
      transform: translateX(-0.0625em);
    }
    20%,
    80% {
      -webkit-transform: translateX(0.125em);
      transform: translateX(0.125em);
    }
    30%,
    50%,
    70% {
      -webkit-transform: translateX(-0.25em);
      transform: translateX(-0.25em);
    }
    40%,
    60% {
      -webkit-transform: translateX(0.25em);
      transform: translateX(0.25em);
    }
  }

  @-webkit-keyframes fall {
    0% {
      opacity: 0;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    70% {
      opacity: 1;
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
      -webkit-animation-timing-function: ease-in-out;
      animation-timing-function: ease-in-out;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }

  @keyframes fall {
    0% {
      opacity: 0;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    70% {
      opacity: 1;
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
      -webkit-animation-timing-function: ease-in-out;
      animation-timing-function: ease-in-out;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }

  .filepond--hopper[data-hopper-state='drag-over'] > * {
    pointer-events: none;
  }

  .filepond--hopper[data-hopper-state='drag-over']::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
  }

  .filepond--progress-indicator {
    z-index: 103;
  }

  .filepond--file-action-button {
    z-index: 102;
  }

  .filepond--file-status {
    z-index: 101;
  }

  .filepond--file-info {
    z-index: 100;
  }

  .filepond--item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 0;
    margin: 0.25em;
    will-change: transform, opacity;
  }
  .filepond--item > .filepond--panel {
    z-index: -1;
  }
  .filepond--item > .filepond--panel .filepond--panel-bottom {
    box-shadow: 0 0.0625em 0.125em -0.0625em rgba(0, 0, 0, 0.25);
  }

  .filepond--item-panel {
    background-color: ${theme.getBackground('tint1')};
  }

  [data-filepond-item-state='processing-complete'] .filepond--item-panel {
    background-color: #369763;
  }

  [data-filepond-item-state*='invalid'] .filepond--item-panel,
  [data-filepond-item-state*='error'] .filepond--item-panel {
    background-color: ${theme.colors.intent.danger};
  }

  .filepond--item-panel {
    border-radius: 0.5em;
    transition: background-color 0.25s;
  }

  .filepond--list-scroller {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    will-change: transform;
  }

  .filepond--list-scroller[data-state='overflow'] {
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -webkit-mask: linear-gradient(
      to bottom,
      #000 calc(100% - 0.5em),
      transparent 100%
    );
    mask: linear-gradient(to bottom, #000 calc(100% - 0.5em), transparent 100%);
  }
  .filepond--list-scroller[data-state='overflow'] .filepond--list {
    bottom: 0;
    right: 0;
  }

  .filepond--list-scroller::-webkit-scrollbar {
    background: transparent;
  }

  .filepond--list-scroller::-webkit-scrollbar:vertical {
    width: 1em;
  }

  .filepond--list-scroller::-webkit-scrollbar:horizontal {
    height: 0;
  }

  .filepond--list-scroller::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 99999px;
    border: 0.3125em solid transparent;
    background-clip: content-box;
  }

  /* hard to overide styles on purpose */
  .filepond--list.filepond--list {
    position: absolute;
    top: 0;
    margin: 0;
    padding: 0;
    list-style-type: none;
    will-change: transform;
  }

  /* used for padding so allowed to be restyled */
  .filepond--list {
    left: 0.75em;
    right: 0.75em;
  }

  .filepond--root[data-style-panel-layout~='integrated'] {
    width: 100%;
    height: 100%;
    max-width: none;
    margin: 0;
  }

  .filepond--root[data-style-panel-layout~='circle'] .filepond--panel-root,
  .filepond--root[data-style-panel-layout~='integrated'] .filepond--panel-root {
  }
  .filepond--root[data-style-panel-layout~='circle'] .filepond--panel-root > *,
  .filepond--root[data-style-panel-layout~='integrated']
    .filepond--panel-root
    > * {
    display: none;
  }

  .filepond--root[data-style-panel-layout~='circle'] .filepond--drop-label,
  .filepond--root[data-style-panel-layout~='integrated'] .filepond--drop-label {
    bottom: 0;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 7;
  }

  .filepond--root[data-style-panel-layout~='circle'] .filepond--item-panel,
  .filepond--root[data-style-panel-layout~='integrated'] .filepond--item-panel {
    display: none;
  }

  .filepond--root[data-style-panel-layout~='compact'] .filepond--list-scroller,
  .filepond--root[data-style-panel-layout~='integrated']
    .filepond--list-scroller {
    overflow: hidden;
    height: 100%;
    margin-top: 0;
    margin-bottom: 0;
  }

  .filepond--root[data-style-panel-layout~='compact'] .filepond--list,
  .filepond--root[data-style-panel-layout~='integrated'] .filepond--list {
    left: 0;
    right: 0;
    height: 100%;
  }

  .filepond--root[data-style-panel-layout~='compact'] .filepond--item,
  .filepond--root[data-style-panel-layout~='integrated'] .filepond--item {
    margin: 0;
  }

  .filepond--root[data-style-panel-layout~='compact'] .filepond--file-wrapper,
  .filepond--root[data-style-panel-layout~='integrated']
    .filepond--file-wrapper {
    height: 100%;
  }

  .filepond--root[data-style-panel-layout~='circle'] {
    border-radius: 99999rem;
    overflow: hidden;
  }
  .filepond--root[data-style-panel-layout~='circle'] > .filepond--panel {
    border-radius: inherit;
  }
  .filepond--root[data-style-panel-layout~='circle'] > .filepond--panel > * {
    display: none;
  }
  .filepond--root[data-style-panel-layout~='circle'] .filepond--file-info {
    display: none;
  }
  .filepond--root[data-style-panel-layout~='circle'] .filepond--file-status {
    display: none;
  }

  .filepond--panel-root {
    border-radius: 0.5em;
    background-color: ${theme.getBackground('tint2')};
  }

  .filepond--panel {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    margin: 0;
    height: 100% !important;
    pointer-events: none;
  }

  .filepond-panel:not([data-scalable='false']) {
    height: auto !important;
  }

  .filepond--panel[data-scalable='false'] > div {
    display: none;
  }

  .filepond--panel[data-scalable='true'] {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    background-color: transparent !important;
    border: none !important;
  }

  .filepond--panel-top,
  .filepond--panel-bottom,
  .filepond--panel-center {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
  }

  .filepond--panel-top,
  .filepond--panel-bottom {
    height: 0.5em;
  }

  .filepond--panel-top {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-bottom: none !important;
  }
  .filepond--panel-top::after {
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    bottom: -1px;
    background-color: inherit;
  }

  .filepond--panel-center,
  .filepond--panel-bottom {
    will-change: transform;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    -webkit-transform: translate3d(0, 0.5em, 0);
    transform: translate3d(0, 0.5em, 0);
  }

  .filepond--panel-bottom {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-top: none !important;
  }
  .filepond--panel-bottom::before {
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    top: -1px;
    background-color: inherit;
  }

  .filepond--panel-center {
    height: 100px !important;
    border-top: none !important;
    border-bottom: none !important;
    border-radius: 0 !important;
  }
  .filepond--panel-center:not([style]) {
    visibility: hidden;
  }

  .filepond--progress-indicator {
    position: static;
    width: 1.25em;
    height: 1.25em;
    color: #fff;
    margin: 0;
    pointer-events: none;
    will-change: transform, opacity;
  }

  .filepond--progress-indicator svg {
    width: 100%;
    height: 100%;
    vertical-align: top;
    transform-box: fill-box;
  }

  .filepond--progress-indicator path {
    fill: none;
    stroke: currentColor;
  }

  .filepond--list-scroller {
    z-index: 6;
  }

  .filepond--drop-label {
    z-index: 5;
  }

  .filepond--drip {
    z-index: 3;
  }

  .filepond--root > .filepond--panel {
    z-index: 2;
  }

  .filepond--browser {
    z-index: 1;
  }

  .filepond--root {
    /* layout*/
    box-sizing: border-box;
    position: relative;
    margin-bottom: 1em;
    /* base font size for whole component */
    font-size: 1rem;
    /* base line height */
    line-height: normal;
    /* up uses default system font family */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    /* will increase font weight a bit on Safari */
    font-weight: 450;
    text-align: left;
    text-rendering: optimizeLegibility;
    direction: ltr;
    contain: layout style size;
  }
  .filepond--root * {
    box-sizing: inherit;
    line-height: inherit;
  }
  .filepond--root[data-disabled] {
    pointer-events: none;
  }

  /**
 * Root element children layout
 */
  .filepond--root .filepond--drop-label {
    min-height: 4.75em;
  }

  .filepond--root .filepond--list-scroller {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .filepond--image-preview-wrapper {
    z-index: 2;
  }

  .filepond--image-preview-overlay {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 44px;
    border-radius: 5px;
    margin: 0;
    opacity: 0;
    z-index: 2;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .filepond--image-preview-overlay svg {
    display: none;
  }

  .filepond--image-preview-overlay-idle {
    display: none;
    border-radius: 5px;
  }

  .filepond--image-preview-overlay-success {
    background-color: ${tinycolor(theme.palette.green.base)
      .setAlpha(0.7)
      .toString()};
  }

  .filepond--image-preview-overlay-failure {
    background-color: ${tinycolor(theme.palette.red.base)
      .setAlpha(0.7)
      .toString()};
  }

  @supports (-webkit-marquee-repetition: infinite) and
    ((-o-object-fit: fill) or (object-fit: fill)) {
    .filepond--image-preview-overlay-idle {
      mix-blend-mode: normal;
    }
  }

  .filepond--image-preview-wrapper {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 100%;
    margin: 0;
    border-radius: 0.45em;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.01);
  }

  .filepond--image-preview {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    pointer-events: none;
    background: #222;
    will-change: transform, opacity;
  }
  .filepond--image-preview[data-transparency-indicator='grid'] img,
  .filepond--image-preview[data-transparency-indicator='grid'] canvas {
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' fill='%23eee'%3E%3Cpath d='M0 0 H50 V50 H0'/%3E%3Cpath d='M50 50 H100 V100 H50'/%3E%3C/svg%3E");
    background-size: 1.25em 1.25em;
  }

  .filepond--image-clip {
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }

  .filepond--image-bitmap,
  .filepond--image-vector {
    position: absolute;
    left: 0;
    top: 0;
    will-change: transform;
  }

  .filepond--root[data-style-panel-layout~='integrated']
    .filepond--image-preview-wrapper {
  }

  .filepond--root[data-style-panel-layout~='integrated']
    .filepond--image-preview {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .filepond--root[data-style-panel-layout~='circle']
    .filepond--image-preview-wrapper {
    border-radius: 99999rem;
  }

  .filepond--root[data-style-panel-layout~='circle']
    .filepond--image-preview-overlay {
    top: auto;
    bottom: 0;
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
  }

  .filepond--root[data-style-panel-layout~='circle']
    .filepond--file
    .filepond--file-action-button[data-align*='bottom']:not([data-align*='center']) {
    margin-bottom: 0.325em;
  }

  .filepond--root[data-style-panel-layout~='circle']
    .filepond--file
    [data-align*='left'] {
    left: calc(50% - 3em);
  }

  .filepond--root[data-style-panel-layout~='circle']
    .filepond--file
    [data-align*='right'] {
    right: calc(50% - 3em);
  }

  .filepond--root[data-style-panel-layout~='circle']
    .filepond--progress-indicator[data-align*='bottom'][data-align*='left'],
  .filepond--root[data-style-panel-layout~='circle']
    .filepond--progress-indicator[data-align*='bottom'][data-align*='right'] {
    margin-bottom: calc(0.325em + 0.1875em);
  }

  .filepond--root[data-style-panel-layout~='circle']
    .filepond--progress-indicator[data-align*='bottom'][data-align*='center'] {
    margin-top: 0;
    margin-bottom: 0.1875em;
    margin-left: 0.1875em;
  }

  .filepond--action-edit-item.filepond--action-edit-item {
    width: 2em;
    height: 2em;
    padding: 0.1875em;
  }
  .filepond--action-edit-item.filepond--action-edit-item[data-align*='center'] {
    margin-left: -0.1875em;
  }
  .filepond--action-edit-item.filepond--action-edit-item[data-align*='bottom'] {
    margin-bottom: -0.1875em;
  }

  .filepond--root[data-style-panel-layout~='circle']
    .filepond--action-edit-item {
    opacity: 1 !important;
    visibility: visible !important;
  }
`
