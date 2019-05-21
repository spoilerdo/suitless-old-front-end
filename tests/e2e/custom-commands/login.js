export default function login(email, password, browser) {
  browser
    .url('http://localhost:8080/login') // Navigate to the url
    .waitForElementVisible('body', 1000) // Wait until you can see the body element.
    .setValue('input[placeholder="Email"]', email)
    .setValue('input[placeholder="Password"]', password)
    .click(("//*[.='Login']"))
    .end() // This must be called to close the browser at the end\
}