export const linkify = inputText => {
  let replacedText
  let replacePattern1
  let replacePattern2
  let replacePattern3
  
  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  )

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  )

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  )

  return replacedText
}

const FLAG = '<flag>'

const flagStr = ({ replacementTargets, text }) => {
  const flaggedStr = replacementTargets.reduce((prevStr, target) => {
    const regex = new RegExp(target, 'g')
    return prevStr.replace(regex, `${FLAG}${target}${FLAG}`)
  }, text)

  return flaggedStr
}

export const replaceTargetString = ({ handleReplacement, text, replacementTargets }) => {
  if (Array.isArray(replacementTargets)) {
    const flaggedStr = flagStr({ replacementTargets, text })
   
    return flaggedStr.split(FLAG).map((target, index) => {
      const targetFoundIndex = replacementTargets.findIndex(tgt => tgt === target)
      const targetFound = replacementTargets[targetFoundIndex]

      if (targetFound !== undefined) {
        return handleReplacement({ index, target: targetFound, replacementTargetsIndex: targetFoundIndex })
      }

      return target

    })
  }

  return ''
}
