const rp = require('request-promise');
const assert = require('assert');
const config = require('../config/config');
const nodemailer = require('nodemailer');
const { SECRET_KEY, INTERVAL, GOOGLE_PLACE_URL, FIELDS, s_k, USER_EMAIL, USER_PASSWORD, } = config;
const handleEmail = (place_id, reviews, data) => {
    const result = JSON.parse(data).result;
    // TODO: take out hanrd coded salon21
    if (result.name === 'Salon 21' || result.reviews.length !== reviews.length) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: USER_EMAIL,
                pass: USER_PASSWORD,
            },
        });
        const mailOptions = {
            from: '"Thai56", Thai.Tran5656@gmail.com',
            to: 'Chipsta@gmail.com',
            subject: 'You\'ve received a new review, well kinda but not really.',
            html: `<a href="http://search.google.com/local/reviews?placeid=${place_id}">${result.name} just got a new review!</a>`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                console.error(err);
            console.log('Message Sent! ', info);
        });
        // TODO: promsify the above and then update the business with the new reviews in the db
    }
};
const handleReviews = (place_id, reviews) => {
    rp(`${GOOGLE_PLACE_URL}?placeid=${place_id}&${FIELDS}&key=${SECRET_KEY}`)
        .then((data) => handleEmail(place_id, reviews, data), (err) => console.log('error fetching the review for business ', err, place_id))
        .catch(err => console.log('error fetching business', err));
};
const reviewHandler = () => {
    let trackerObj = {};
    return businessDbInstance => {
        // get all instances
        businessDbInstance.find({}).toArray((err, result) => {
            if (err)
                console.error('There was an error getting all businesses', err);
            result.forEach(business => {
                if (business.reviews) {
                    trackerObj[business.place_id] = setInterval(() => handleReviews(business.place_id, business.reviews), INTERVAL);
                }
            });
        });
    };
};
module.exports = reviewHandler;
//# sourceMappingURL=reviews.service.js.map