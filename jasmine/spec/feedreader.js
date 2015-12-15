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
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should not have any undefined URLs', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
            }
         });

         it('should not have any empty URLs', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).not.toBe('');
            }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should not have any undefined names', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
            }
         });

         it('should not have any empty names', function() {
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

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should have a least a single entry element when loadFeed completes', function() {
            expect($('.feed').children().length).not.toBe(0);
        });
    });



    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
