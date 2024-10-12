import puppeteer from "puppeteer"

const url = "https://www.imdb.com/chart/top/?ref_=nv_mv_250"

const scrapeMovieData = async (url: string) => {
    // Launch new browser instance
    const browser = await puppeteer.launch({ headless: false })

    // Open new page
    const page = await browser.newPage()

    // Navigate to url
    await page.goto(url, { waitUntil: "networkidle2" })

    // Scrape movie details
    const movieData = await page.evaluate(() => {
        const movieList = document.querySelectorAll('.sc-ab348ad5-0.bEGyCS') // Grab the movie list container
        if (!movieList) return []

        const movies = Array.from(movieList) // Query all rows (each movie)

        return movies.map((movie: Element) => {
            // Get img url
            const movieImg = movie.querySelector('.ipc-image img')?.getAttribute('src')

            // Get movie title
            const movieTitle = movie.querySelector('h3.ipc-title__text')?.textContent?.trim()

            // Get the year and duration
            const metadataItems = movie.querySelectorAll('.cli-title-metadata-item')
            const movieYear = metadataItems[0]?.textContent?.trim() // First span for year
            const movieDuration = metadataItems[1]?.textContent?.trim() // Second span for duration

            // Get rating
            const movieRating = movie.querySelector(`span.ipc-rating-star--rating`)?.textContent?.trim()

            // Get description
            const movieDescription = movie.querySelector('div.ipc-html-content-inner-div')?.textContent?.trim();

            return { movieImg, movieTitle, movieYear, movieDuration, movieRating, movieDescription }
        })
    })

    // Close browser after scraping
    await browser.close()

    // Return scraped data
    return movieData
}

scrapeMovieData(url).then((data) => {
    console.log(data);
}).catch((err) => {
    console.error("Error scraping dara:", err);
})