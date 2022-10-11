const mongoose = require('mongoose');
const slugify = require('slugify');
const { marked } = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        required: true
    }
});

articleSchema.pre('validate', function(next) {
    
    // create unique slug using title
    if(this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        });     
    }

    // convert markdown to HTML
    if(this.markdown) {
        this.sanitizedHTML = dompurify.sanitize(marked(this.markdown));
    }

    next();
});

const Article = mongoose.model('blog', articleSchema);

module.exports = Article;