/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // Test suite for tests related to the "allFeeds" object.
    describe('RSS Feeds', function() {

        // Test that each element of the "allFeeds" object is defined.
        it('should not have an undefined or empty feeds array', function() {
            // Check that the allFeeds array is defined
            expect(allFeeds).toBeDefined();
            // Check that the length of the allFeeds array is not 0 (empty)
            expect(allFeeds.length).not.toBe(0);
        });

        // Test that the URL key of each element of the "allFeeds"
        // array is defined and not empty.
        it('elements of the "allFeeds" array should not any undefined or empty URLs', function() {
            // loop through each element of the array and ensure the URL for
            // each is defined.
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
            }
            // Loop through each element of the array and ensure the URL for each
            // is not an empty string.
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        // Test that the name key of each element of the "allFeeds"
        // array is defined and not empty.
        it('elements of the "allFeeds" array should not any undefined or empty names', function() {
            // loop through each element of the array and ensure the name for
            // each is defined.
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
            }
            // Loop through each element of the array and ensure the name for each
            // is not an empty string.
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        // Utilizing an idea from the Udacity forums, we can add an
        // "toHaveClass" matcher. This will be helpful for seeing
        // if a certain element has a specific class. We are using the
        // "jasmine-jQuery" library found here...
        // https://github.com/velesin/jasmine-jquery
        beforeEach(function () {
            jasmine.addMatchers({ // Add a "toHaveClass" matcher to use with jasmine
                toHaveClass: function () {
                    return {
                        compare: function (actual, className) {
                            return { pass: $(actual).hasClass(className)}
                        }
                    }
                }
            }); // end adding "toHaveClass" matcher to use with jasmine
        });

        it('should be hidden by default', function() {
            // Check that the body has the class "menu-hidden" after the page loads
            expect($('body')).toHaveClass('menu-hidden');
        });

        it('should change visibility to VISIBLE when the menu icon is clicked and NOT VISIBLE when clicked a second time', function() {
            var $menu = $('.menu-icon-link'); // assign the needed element to a variable

            $menu.click() // click the menu

            // verify the menu-hidden class is NOT present for the document body
            expect(document.body.classList.contains('menu-hidden')).toBe(false);

            $menu.click() // click the menu a second time

            // verify the menu-hidden class IS present for the document body
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    // Test suite for testing initial feed entries
    describe('Initial Entries', function() {

        // run the loadFeed function before each "it" test
        beforeEach(function(done) {
            loadFeed(0, done); // Run the loadFeed function
        });

        it('should have a least a single entry element when loadFeed completes', function(done) {
            // Check that the feed div container has at least one child
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    // Test suite for testing the loading of new feeds
    describe('New Feed Selection', function() {

         // Create a local scope variables to hold the html of the feed information
         var $feedHeaderPre = '';
         var $feedHeaderPost = '';

         beforeEach(function(done) {

            // Call the "loadFeed" function to get fresh feed info
            loadFeed(0, function() { // First we call the function with ID 0 to get initial feed
                // Grab the feed html for later comparison
                $feedHeaderPre = $('.feed').html();
                loadFeed(1, function () { // Call the loadFeed function again with a new ID for new feed info
                    // Grab the feed html for later comparison
                    $feedHeaderPost = $('.feed').html();
                    done();
                });
            });
        });

        // Create an "afterEach" function to reset the feed elements
        // to what they were before the test was ran. This idea did not
        // really occur to me initially, but after reviewing course discussions, it
        // appeared many others were performing a similar action and it makes
        // sense. We don't want to alter the initial load for a test then leave it.
        afterEach(function (done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should change the content of the feed when the loadFeed function completes', function(done) {
            // Check to see if the initial feed html is different
            // than the secondary feed html as expected
            expect($feedHeaderPre).not.toEqual($feedHeaderPost);
            done();
        });
    });
}());
