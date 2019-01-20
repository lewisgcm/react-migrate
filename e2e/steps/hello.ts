import { Given, Then, When } from "cucumber";
import * as expect from "expect";
import { browser, by, element, ElementFinder, ExpectedConditions, Key } from "protractor";

Given( "I go to {string}" , async ( site ) => {
    browser.ignoreSynchronization = true;
    await browser.get( site );
    expect( await element( by.className("Q8LRLc") ).getText() ).toBe( "United Kingdom" );
});

When( "I search for {string}", async ( search ) => {
    const searchInput: ElementFinder = await element( by.name( "q" ) );
    await browser.wait( ExpectedConditions.visibilityOf(searchInput), 5000 );

    await searchInput.sendKeys( search );
    await searchInput.sendKeys( Key.ENTER );
});

Then( "My title should contain {string}", async ( title ) => {
    expect( await browser.getTitle() ).toContain( title );
});
