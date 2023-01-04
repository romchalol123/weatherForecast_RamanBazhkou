export class DOMHelper {
  constructor(units) {
    this.units = units;
  }

  createBoxElement(thisTag, classList, children, attribs = undefined) {
    return this.createElement({
      tag: thisTag,
      classList,
      attributes: attribs,
      children,
      childrenAction: 'append',
    });
  }

  createError(errText) {
    const error = this.createElement({
      tag: 'p',
      classList: 'error-txt',
      textContent: errText,
    });

    error.style.color = 'red';
    error.style.textAlign = 'center';

    return error;
  }

  createDate(date, tag = 'h5') {
    return this.createElement({
      tag,
      classList: ['date'],
      textContent: date,
    });
  }

  createTime(date, tag = 'h5') {
    return this.createElement({
      tag,
      classList: ['time'],
      textContent: date,
    });
  }

  createTemp(temp) {
    return this.createElement({
      tag: 'p',
      classList: ['temp'],
      textContent: `${Math.round(temp)} ${this.units.temp}`,
    });
  }

  createNowNFeelTemp(tempCurr, tempFL) {
    return this.createElement({
      tag: 'p',
      classList: ['avg-temp'],
      textContent: `Now: ${Math.round(tempCurr)}${this.units.temp}, feels like ${Math.round(
        tempFL,
      )} ${this.units.temp}`,
    });
  }

  createAvgTemp(tempMax, tempMin) {
    return this.createElement({
      tag: 'h5',
      classList: ['avg-temp'],
      textContent: `${Math.round(tempMax)}/${Math.round(tempMin)} ${this.units.temp}`,
    });
  }

  createDescription(statusText, tag = 'h5') {
    return this.createElement({
      tag,
      classList: ['current-status'],
      textContent: statusText,
    });
  }

  createConditionImg(imgCode, imgScale = undefined) {
    let imgSet;

    if (imgScale) {
      imgSet = `${imgCode}@${imgScale}`;
    } else {
      imgSet = imgCode;
    }

    const link = `http://openweathermap.org/img/wn/${imgSet}.png`;

    return this.createElement({
      tag: 'img',
      classList: ['condition'],
      attributes: [
        { prop: 'src', value: link },
        { prop: 'alt', value: 'img' },
      ],
    });
  }

  createParamImg(className, rotationValue) {
    const type = {
      wind: 'fa-circle-up',
      hum: 'fa-droplet',
      pres: 'fa-gauge-high',
      vis: 'fa-binoculars',
    };

    const paramImg = this.createElement({
      tag: 'i',
      classList: ['fa', 'fa-thin', type[className]],
    });

    if (className === Object.keys(type)[0]) {
      paramImg.style.transform = `rotate(${rotationValue}deg)`;
    }

    return paramImg;
  }

  createParamTitle(className, paramText, paramValue) {
    if (className === 'srise' || className === 'sset') {
      paramValue = this.convertTimeToUTC(paramValue);
    }

    return this.createElement({
      tag: 'p',
      classList: ['add-param-txt'],
      textContent: `${paramText}: ${paramValue}${this.units[className]}`,
    });
  }

  createAddParameter(className, paramText, paramValue, rotationValue = undefined) {
    const img = this.createParamImg(className, rotationValue);
    const text = this.createParamTitle(className, paramText, paramValue);

    return this.createElement({
      tag: 'div',
      classList: ['add-param', className],
      children: [img, text],
      childrenAction: 'append',
    });
  }

  createSunTime(sunriseTime, sunsetTime) {
    return this.createElement({
      tag: 'p',
      classList: ['sun-time'],
      textContent: `Sunrise: ${sunriseTime}, sunset: ${sunsetTime}`,
    });
  }

  createRecentDeleteBtn(id) {
    return this.createElement({
      tag: 'button',
      classList: ['btn-close'],
      attributes: [
        { prop: 'id', value: id },
        { prop: 'type', value: 'button' },
        { prop: 'aria-label', value: 'Close' },
      ],
    });
  }

  createLocationItem(city, id, type = undefined, button = undefined) {
    let text;
    if (type) {
      text = city;
    } else if (!city.state) {
      text = `${city.name}, ${city.country}`;
    } else {
      text = `${city.name}, ${city.state}, ${city.country}`;
    }

    return this.createElement({
      tag: 'li',
      classList: ['list-item'],
      attributes: [{ prop: 'id', value: id }],
      textContent: text,
      children: button,
      childrenAction: 'append',
    });
  }

  createEmptyMsg() {
    return this.createElement({
      tag: 'p',
      classList: 'empty-msg',
      textContent: 'Your search history is empty.',
    });
  }

  createElement({ tag, classList, attributes, textContent, handlers, children, childrenAction }) {
    const element = document.createElement(tag);

    if (classList?.length) {
      element.classList.add(...classList);
    }

    if (attributes?.length) {
      attributes.forEach(({ prop, value }) => {
        element.setAttribute(prop, value);
      });
    }

    if (textContent?.length) {
      element.textContent = textContent;
    }

    if (handlers?.length) {
      handlers.forEach(({ event, handler }) => {
        element.addEventListener(event, handler);
      });
    }

    if (children) {
      element[childrenAction](...children);
    }

    return element;
  }
}
