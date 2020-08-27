# File Structure

## Is there a recommended way to structure React projects?

React doesn’t have opinions on how you put files into folders. That said there are a few common approaches popular in the ecosystem you may want to consider.

## Grouping by features or routes

One common way to structure projects is to locate CSS, JS, and tests together inside folders grouped by feature or route.

```ts
common / Avatar.js;
Avatar.css;
APIUtils.js;
APIUtils.test.js;
feed / index.js;
Feed.js;
Feed.css;
FeedStory.js;
FeedStory.test.js;
FeedAPI.js;
profile / index.js;
Profile.js;
ProfileHeader.js;
ProfileHeader.css;
ProfileAPI.js;
```

The definition of a “feature” is not universal, and it is up to you to choose the granularity. If you can’t come up with a list of top-level folders, you can ask the users of your product what major parts it consists of, and use their mental model as a blueprint.

## Grouping by file type

Another popular way to structure projects is to group similar files together, for example:

```ts
api / APIUtils.js;
APIUtils.test.js;
ProfileAPI.js;
UserAPI.js;
components / Avatar.js;
Avatar.css;
Feed.js;
Feed.css;
FeedStory.js;
FeedStory.test.js;
Profile.js;
ProfileHeader.js;
ProfileHeader.css;
```

Some people also prefer to go further, and separate components into different folders depending on their role in the application. For example, Atomic Design is a design methodology built on this principle. Remember that it’s often more productive to treat such methodologies as helpful examples rather than strict rules to follow.

## Avoid too much nesting

There are many pain points associated with deep directory nesting in JavaScript projects. It becomes harder to write relative imports between them, or to update those imports when the files are moved. Unless you have a very compelling reason to use a deep folder structure, consider limiting yourself to a maximum of three or four nested folders within a single project. Of course, this is only a recommendation, and it may not be relevant to your project.
