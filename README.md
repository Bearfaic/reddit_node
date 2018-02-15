# reddit_node
This node, when sent a Get request to localhost:8000/redditer/:search will retreive information from 
reddit.com/r/subredditsimulator, specifically from posts containing :search in their titles. 
Due to the nature of the subreddit simulator, there are no words garuanteed to exist in more than one title, so it is recommended
that you use "is", or similarly ubiquitous words. 
Subreddit Simulator exists to allow the redditing experience to happen in an automated fashion, and in the interests of further 
paring down the reddit experience, this node will only tell you how many upvotes each post got, as all other information is 
clearly unneccesary.
