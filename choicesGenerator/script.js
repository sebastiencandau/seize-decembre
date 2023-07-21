// script.js
function logInputs() {
  const caseInput = document.getElementById("case");
  const messagesInput = document.getElementById("messages");
  const choicesInput = document.getElementById("choices");

  const caseValue = caseInput.value;
  const messagesValue = messagesInput.value;
  const choicesValue = choicesInput.value;

  const createMessage = (msg, received) => ({ msg, type: null, received });
  const messagesArray = messagesValue.split(";").map(msg => createMessage(msg.trim(), true));

  const choicesArray = choicesValue.split(";").map(choice => choice.trim());

  const resultText = `case "${caseValue}":
  return {
      messages: ${JSON.stringify(messagesArray, null, 2)
        .replace(/"msg":/g, 'msg:')
        .replace(/"type":/g, 'type:')
        .replace(/"received":/g, 'received:')
      },
      choices: ${JSON.stringify(choicesArray, null, 2)}
  };`;

  console.log(resultText);
}
