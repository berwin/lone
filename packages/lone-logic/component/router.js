import { noop } from 'lone-util'

export default function events (Lone) {
  const proto = Lone.prototype
  proto.navigateTo = navigateTo
  proto.redirectTo = redirectTo
  proto.navigateBack = navigateBack
}

function navigateTo ({ url, success = noop, fail = noop, complete = noop }) {
  this._slave
    .send('logic:navigateTo', null, { url })
    .then(res => success(res), err => fail(err))
    .then(complete)
}

function redirectTo ({ url, success = noop, fail = noop, complete = noop }) {
  this._slave
    .send('logic:redirectTo', null, { url })
    .then(res => success(res), err => fail(err))
    .then(complete)
}

function navigateBack ({ delta, success = noop, fail = noop, complete = noop } = {}) {
  this._slave
    .send('logic:navigateBack', null, { delta })
    .then(res => success(res), err => fail(err))
    .then(complete)
}
