#!/usr/bin/env python3
"""
PlayOnHub Reddit Auto-Poster
Automatically posts promotional content to Reddit subreddits on a daily schedule.

=== SETUP INSTRUCTIONS ===

1. Install Python dependencies:
   pip install praw

2. Create a Reddit App:
   a. Go to https://www.reddit.com/prefs/apps
   b. Click "create another app"
   c. Choose "script" type
   d. Name: PlayOnHub Bot
   e. Redirect URI: http://localhost
   f. Click "create app"
   g. Copy the client_id (string under the app name, ~14 chars)
   h. Copy the client_secret (labeled "secret")

3. Fill in your credentials below (REDDIT_CREDENTIALS section)

4. Run this script:
   python reddit_autoposter.py

5. To auto-run daily, add to Windows Task Scheduler:
   - Action: Start a program
   - Program: python
   - Arguments: "C:\path\to\reddit_autoposter.py"
   - Trigger: Daily at 09:00

=== IMPORTANT NOTES ===
- Reddit rate limit: 1 post per 10 minutes per subreddit
- Do NOT spam. This script posts to ONE subreddit per day.
- Check each subreddit's rules before posting.
- If a post fails, the script will log the error and continue.
"""

import praw
import sys
import json
from datetime import datetime, timedelta

# ============ CONFIGURATION ============
# Replace these with your Reddit API credentials
REDDIT_CREDENTIALS = {
    "client_id": "YOUR_CLIENT_ID_HERE",        # From https://www.reddit.com/prefs/apps
    "client_secret": "YOUR_CLIENT_SECRET_HERE", # From the same page
    "username": "YOUR_REDDIT_USERNAME",          # Your Reddit username (without /u/)
    "password": "YOUR_REDDIT_PASSWORD",          # Your Reddit password
    "user_agent": "PlayOnHub Bot v1.0 by /u/YOUR_USERNAME",
}

# Campaign start date (first posting day)
CAMPAIGN_START = datetime(2026, 7, 8)  # Day 1 = July 8, 2026

# ============ REDDIT POST CONTENT ============

POSTS = [
    {
        "day": 1,
        "subreddit": "IOGames",
        "title": "I built a free browser game portal with 20+ .io games — no ads, no downloads, just play",
        "body": (
            "Hey everyone! I got tired of game sites cluttered with pop-up ads and fake download buttons, "
            "so I built **PlayOnHub** — a clean, fast game portal where you can play 20+ .io and browser games instantly.\n\n"
            "**What's included:**\n"
            "- Shell Shockers, Agar.io, Smash Karts, Diep.io, 1v1.LOL\n"
            "- Paper.io 2, Skribbl.io, Bloxd.io, LOLBeans.io\n"
            "- Plus puzzle, driving, and arcade games\n\n"
            "**No downloads, no signups, no pop-up ads.** Just click and play.\n\n"
            "Play here: https://playonhub.com\n\n"
            "I also wrote some game guides:\n"
            "- Shell Shockers weapon guide: https://playonhub.com/blog/shell-shockers-weapon-guide\n"
            "- Agar.io private server guide: https://playonhub.com/blog/agar-io-private-server-guide\n"
            "- Best .io games of 2026: https://playonhub.com/blog/best-io-games-2026\n\n"
            "Feedback welcome! What games should I add next?"
        ),
    },
    {
        "day": 2,
        "subreddit": "browsergames",
        "title": "PlayOnHub — 20 free browser games with zero ads (no download, instant play)",
        "body": (
            "Hi all! Wanted to share a project I've been working on.\n\n"
            "**PlayOnHub** is a free browser game site with 20+ games across multiple categories:\n\n"
            "IO Games: Shell Shockers, Agar.io, Smash Karts, Diep.io, 1v1.LOL, Skribbl.io\n"
            "Driving: Drift Hunters, Moto X3M, Escape Road, Eggy Car\n"
            "Puzzle: 2048, Word Scramble\n"
            "Casual: Slope, Basket Random, LOLBeans.io\n\n"
            "Key features:\n"
            "- Instant play (no downloads or installs)\n"
            "- Mobile-friendly responsive design\n"
            "- Each game has tips, how-to-play, and FAQ\n"
            "- Blog with strategy guides\n\n"
            "Link: https://playonhub.com\n\n"
            "Some popular guides:\n"
            "- Slope high score guide: https://playonhub.com/blog/slope-high-score-guide\n"
            "- 1v1.LOL building guide: https://playonhub.com/blog/1v1-lol-unblocked-guide\n"
            "- 2048 strategy to reach 4096: https://playonhub.com/blog/2048-strategy-guide\n\n"
            "Would love to hear what you think!"
        ),
    },
    {
        "day": 3,
        "subreddit": "webgames",
        "title": "20 free browser games you can play right now — no download needed",
        "body": (
            "Just launched **PlayOnHub** — a clean, ad-free browser game portal!\n\n"
            "Top 5 most popular games:\n"
            "1. Shell Shockers — egg-based multiplayer FPS\n"
            "2. Smash Karts — kart battle royale\n"
            "3. Slope — 3D neon speed run\n"
            "4. Agar.io — the original .io game\n"
            "5. 1v1.LOL — build and shoot like Fortnite\n\n"
            "20 games total across io, driving, puzzle, casual, and sports categories.\n\n"
            "Play free: https://playonhub.com\n\n"
            "Every game page includes How to Play instructions, Pro tips, FAQ, and related games.\n\n"
            "I also have 12 blog articles with game guides and strategy tips.\n\n"
            "What's your favorite browser game? Let me know what I should add!"
        ),
    },
    {
        "day": 4,
        "subreddit": "gaming",
        "title": "I made a free game site with 20 browser games — what should I add next?",
        "body": (
            "Hey r/gaming! I built a free browser game portal called PlayOnHub.\n\n"
            "It has 20 games across different categories:\n"
            "- FPS: Shell Shockers, 1v1.LOL, Krunker.io\n"
            "- Racing: Drift Hunters, Smash Karts, Moto X3M\n"
            "- Puzzle: 2048, Slope\n"
            "- IO: Agar.io, Diep.io, Paper.io 2, Skribbl.io\n\n"
            "No ads, no downloads, no signups. Just click and play.\n\n"
            "Link: https://playonhub.com\n\n"
            "I'm planning to add more games. What browser games do you want to see?"
        ),
    },
    {
        "day": 5,
        "subreddit": "indiegames",
        "title": "[Showcase] PlayOnHub — a clean, ad-free browser game portal I built",
        "body": (
            "Hi r/indiegames! I'd like to showcase my project: PlayOnHub.\n\n"
            "It's a browser game portal focused on a clean, ad-free experience. "
            "20+ free games you can play instantly — no downloads, no popups, no signups.\n\n"
            "Tech stack: Next.js 16, TypeScript, Tailwind CSS, deployed on Vercel.\n\n"
            "Features:\n"
            "- 20 games with thumbnails, tips, and FAQ\n"
            "- 12 SEO blog articles with game guides\n"
            "- JSON-LD structured data for SEO\n"
            "- Mobile responsive design\n\n"
            "Check it out: https://playonhub.com\n\n"
            "Happy to answer any technical questions about the build!"
        ),
    },
    {
        "day": 6,
        "subreddit": "IOGames",
        "title": "Best .io games of 2026 — my ranked list of 10 must-play browser games",
        "body": (
            "After playing way too many .io games, I put together a ranked list of the best ones for 2026.\n\n"
            "Top 10:\n"
            "1. Shell Shockers — egg FPS with 7 weapon classes\n"
            "2. Krunker.io — blocky pixel FPS\n"
            "3. Smash Karts — kart battle royale\n"
            "4. Agar.io — the original\n"
            "5. Diep.io — tank shooter with upgrade paths\n"
            "6. Paper.io 2 — territory conquest\n"
            "7. 1v1.LOL — build and shoot\n"
            "8. LOLBeans.io — Fall Guys in browser\n"
            "9. Bloxd.io — Minecraft-like sandbox\n"
            "10. Skribbl.io — draw and guess\n\n"
            "Full article with details: https://playonhub.com/blog/best-io-games-2026\n\n"
            "You can play all of these for free on PlayOnHub: https://playonhub.com\n\n"
            "What's your ranking? Did I miss any?"
        ),
    },
    {
        "day": 7,
        "subreddit": "webgames",
        "title": "Slope, Shell Shockers, or Agar.io — which browser game is most addictive?",
        "body": (
            "Curious to hear what people think. I've been playing all three on my site PlayOnHub "
            "and honestly can't decide which is the most addictive.\n\n"
            "- Slope: pure reflex test, one more try mentality\n"
            "- Shell Shockers: multiplayer FPS, competitive\n"
            "- Agar.io: simple but the domination feeling is unmatched\n\n"
            "Play all three free: https://playonhub.com\n\n"
            "Vote in comments — which one keeps you up at night?"
        ),
    },
]


def get_campaign_day():
    """Calculate which day of the campaign we're on."""
    today = datetime.now()
    delta = today - CAMPAIGN_START
    day = delta.days + 1
    return day


def get_today_post():
    """Get the post content for today's campaign day."""
    day = get_campaign_day()
    if day < 1:
        return None
    # Cycle through posts if we've gone past day 7
    post_index = (day - 1) % len(POSTS)
    return POSTS[post_index]


def post_to_reddit(post):
    """Post content to Reddit."""
    try:
        reddit = praw.Reddit(**REDDIT_CREDENTIALS)

        # Verify credentials
        if not reddit.user.me():
            print("ERROR: Could not authenticate with Reddit. Check your credentials.")
            return False

        print(f"Authenticated as: u/{reddit.user.me()}")

        # Submit the post
        subreddit = reddit.subreddit(post["subreddit"])
        submission = subreddit.submit(
            title=post["title"],
            selftext=post["body"],
        )

        print(f"SUCCESS: Posted to r/{post['subreddit']}")
        print(f"  Title: {post['title']}")
        print(f"  URL: https://reddit.com{submission.permalink}")
        return True

    except praw.exceptions.RedditAPIException as e:
        print(f"REDDIT API ERROR:")
        for item in e.items:
            print(f"  - {item.field}: {item.message}")
        return False
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return False


def main():
    print("=" * 60)
    print("  PlayOnHub Reddit Auto-Poster")
    print("=" * 60)

    # Check if credentials are configured
    if REDDIT_CREDENTIALS["client_id"] == "YOUR_CLIENT_ID_HERE":
        print("\nERROR: Reddit credentials not configured!")
        print("\nSetup instructions:")
        print("1. Go to https://www.reddit.com/prefs/apps")
        print("2. Click 'create another app' → choose 'script'")
        print("3. Name: PlayOnHub Bot, Redirect URI: http://localhost")
        print("4. Copy client_id and client_secret")
        print("5. Edit this file and fill in REDDIT_CREDENTIALS")
        print("6. Re-run this script")
        sys.exit(1)

    # Get today's post
    day = get_campaign_day()
    post = get_today_post()

    if day < 1:
        print(f"\nCampaign hasn't started yet. Start date: {CAMPAIGN_START.strftime('%Y-%m-%d')}")
        sys.exit(0)

    print(f"\nCampaign Day: {day}")
    print(f"Target Subreddit: r/{post['subreddit']}")
    print(f"Title: {post['title']}")
    print(f"\nContent preview (first 200 chars):")
    print(post["body"][:200] + "...")

    # Check if --auto flag is passed (for scheduled runs)
    if "--auto" not in sys.argv:
        confirm = input("\nPost this now? (y/n): ")
        if confirm.lower() != "y":
            print("Cancelled.")
            sys.exit(0)

    # Post to Reddit
    print("\nPosting to Reddit...")
    success = post_to_reddit(post)

    if success:
        print("\nDone! Check your post on Reddit.")
    else:
        print("\nFailed to post. Check the error above.")
        sys.exit(1)


if __name__ == "__main__":
    main()
