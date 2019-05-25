import {createNodesFrom} from '@zhoujiahao/utils'
import 'style/indicator.scss'

const defaultConfig = {
  totalStep: 0,
  indicatorColor: '#000',
  indicatorHighlightColor: '#fff',
  x: 0,
  y: 0,
};

const stepIndicator = function (userConfig) {
  const config = Object.assign(defaultConfig, userConfig);
  const mountSelf = () => {
    const subIndicatorHTML = `<span>.</span>`;
    const indicatorTpl = `
        <div class="step-indicator">
            ${subIndicatorHTML.repeat(config.totalStep)}
        </div>
    `;
    const $indicator = createNodesFrom(indicatorTpl)[0];

    const styleStr = `
      position: absolute;
      top: ${config.y};
      left: ${config.x};
      color: ${config.indicatorColor}
     `;

    $indicator.setAttribute('style', styleStr);
    document.body.append($indicator);
    if (config.x === 'center') {
      const { width } = $indicator.getBoundingClientRect();
      $indicator.style.left = `calc(50% - ${width / 2}px)`
    }
    return $indicator;
  };

  let $indicator = mountSelf();
  return {
    highlightStep(index) {
      if (index < 0 || index > config.totalStep - 1) {
        return;
      }
      const $step = $indicator.children[index];
      $step.style.color = config.indicatorHighlightColor;
    },
    destroy() {
      $indicator.classList.add('done');
      setTimeout(() => {
        $indicator.remove();
        $indicator = null;
      }, 2000)
    }
  }
};

export default stepIndicator;