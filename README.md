# Tune Turner

## Overview
There is a gap between modern music consumption and DJ workflow. Spotify is currently the most used streaming service in the US and Europe, however they offer no ability to download MP3, FLAC, or WAV files. Downloading these specific file types is a crucial step in performing as a DJ, as modern equipment requires you to “load” in a file before it can be mixed.

TuneTurner aims to streamling this process by automatically building Amazon Carts with each available song in a Spotify Playlist. This converts hundreds of manual processes into one simple click.

## Technical Note 
Currently, TuneTurner is utilizing a proof-of-concept solution awaiting approval for the Amazon Product Advertising API.

Amazon products are assigned specific IDs - ASINs. The best way to find exact ASINs is utilizing the Amazon Product Advertising API, which is only available to Amazon Affiliates.

Once TuneTurner has been approved for the Product Advertising API + Affiliate Program the current solution will be refactored.