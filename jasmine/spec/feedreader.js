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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('should not have an undefined or empty feeds array', function() {
            // Check that the allFeeds array is defined
            expect(allFeeds).toBeDefined();
            // Check that the length of the allFeeds array is not 0 (empty)
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('should not any undefined URLs in the allFeeds array', function() {
            // loop through each element of the array and ensure the URL for
            // each feed is defined.
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
            }
         });

         it('should not have any empty URLs in the allFeeds array', function() {
            // Loop through each element of the array and ensure the URL for each feed
            // is not an empty string.
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).not.toBe('');
            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('should not have any undefined names', function() {
            // Loop through each element of the array and ensure the name for each feed
            // is not undefined.
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
            }
         });

         it('should not have any empty names', function() {
            // Loop through each element of the array and ensure the name for each feed
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

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should hide the menu element by default', function() {
            // Check that the body has the class "menu-hidden" after the page loads
            expect($('body')).toHaveClass('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should change visibility to VISIBLE when the menu icon is clicked', function() {
            var menu = $('.menu-icon-link'); // assign the needed element to a variable
            menu.click() // click the menu

            // verify the menu-hidden class is not present for the document body
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
        });

        it('should change visibility to NOT VISIBLE when the menu icon is clicked a SECOND time', function() {
            var menu = $('.menu-icon-link'); // assign the needed element to a variable
            menu.click() // click the menu a second time

            // verify the menu-hidden class is present for the document body
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // run the loadFeed function before each "it" test
        beforeEach(function(done) {
            loadFeed(0, done); // Run the loadFeed function
        });

        it('should have a least a single entry element when loadFeed completes', function(done) {
            // Check that the feed div container has at least one child
            expect($('.feed').children().length).not.toBe(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         // Create a local array variables to hold the html of the feed headers
         var feedHeaderPre = [];
         var feedHeaderPost = [];

         beforeEach(function(done) {
            // Iterate through each "feed header" element and
            // push the "html" of that header element into an
            // array for later comparison.
            $('.feed').find('.entry h2').each(function() {
                feedHeaderPre.push($(this).html());
            });
            // Now that we have all the "feed" element header html
            // saved, we can re-run the loadFeed function using a
            // different "id" to load new feed items.
            loadFeed(1, done);
        });

         // Create an "afterEach" function to reset the feed elements
         // to what they were before the test was ran. This idea did not
         // really occur to me, but after reviewing course discussions, it
         // appeared many others were performing a similar action and it makes
         // sense. We don't want to alter the initial load for a test then leave it.
         afterEach(function (done) {
            loadFeed(0, done);
            done();
         });

        it('should change the content of the feed when the loadFeed function completes', function(done) {
            // Iterate through each "feed header" element and
            // push the "html" of that header element into an
            // array for later comparison.
            $('.feed').find('.entry h2').each(function() {
                feedHeaderPost.push($(this).html());
            });
            // Check to see if the initial load array object
            // is the same as the secondary load array object.
            // If they match, the content was not updated.
            expect(feedHeaderPre).not.toBe(feedHeaderPost);
            done();
        });
    });
}());
