export default function events (Lone) {
  const proto = Lone.prototype
  proto.navigateTo = navigateTo
  proto.redirectTo = redirectTo
  proto.navigateBack = navigateBack
}

function navigateTo ({ url }) {
  this._slave.send('logic:navigateTo', null, { url })
}

function redirectTo ({ url }) {
  this._slave.send('logic:redirectTo', null, { url })
}

function navigateBack ({ delta } = {}) {
  this._slave.send('logic:navigateBack', null, { delta })
}
