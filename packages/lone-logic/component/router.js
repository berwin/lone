import { slave } from '../schedule'

export default function events (Lone) {
  const proto = Lone.prototype
  proto.navigateTo = navigateTo
  proto.redirectTo = redirectTo
  proto.navigateBack = navigateBack
}

function navigateTo (url) {
  slave.send('logic:navigateTo', null, { url })
}

function redirectTo (url) {
  slave.send('logic:redirectTo', null, { url })
}

function navigateBack (delta) {
  slave.send('logic:navigateBack', null, { delta })
}
