# subreddit-downloader
Script for downloading all links from a particular subreddit in json format.
Note that the Reddit API restricts pagination to the last 10 pages or ~1000 results.
Data is generated in the following format:

* Download directory (defaults to `data`)
   * `all.json` - A file with all the page data combined.
   * `links.txt` - A txt file with all of the link URLs and titles. Pages are separated by `-----`.
   * Pages - Contains a file for each page.
      * `page_id`.json

## Usage

### Install dependencies
```
npm install
```

### Running
In the directory of the repo, run:
```
node subreddit
```
Afterwards just follow the prompts.
