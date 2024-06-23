import { storyService } from '../services/story.service.local'
import { store } from './store'
import { ADD_STORY, REMOVE_STORY, SET_STORYS, SET_STORY, UPDATE_STORY, ADD_STORY_MSG } from './story.reducer'

export async function loadStorys() {
    try {
        const storys = await storyService.query()
        console.log('Storys from DB:', storys)
        store.dispatch(getCmdSetStorys(storys))
    } catch (err) {
        console.log('Cannot load storys', err)
        throw err
    }
}

export async function loadStory(storyId) {
    try {
        const story = await storyService.getById(storyId)
        console.log('Story from DB:', story)
        store.dispatch(getCmdSetStory(story))
    } catch (err) {
        console.log('Cannot load story', err)
        throw err
    }
}


export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getCmdRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Added Story', savedStory)
        store.dispatch(getCmdAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Updated Story:', savedStory)
        store.dispatch(getCmdUpdateStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}

export async function addStoryMsg(storyId, txt) {
    try {
        const msg = await storyService.addStoryMsg(storyId, txt)
        console.log('Added Story message', msg)
        store.dispatch(getCmdAddStoryMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add story msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetStorys(storys) {
    return {
        type: SET_STORYS,
        storys
    }
}
function getCmdSetStory(story) {
    return {
        type: SET_STORY,
        story
    }
}
function getCmdRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        storyId
    }
}
function getCmdAddStory(story) {
    return {
        type: ADD_STORY,
        story
    }
}
function getCmdUpdateStory(story) {
    return {
        type: UPDATE_STORY,
        story
    }
}
function getCmdAddStoryMsg(msg) {
    return {
        type: ADD_STORY_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadStorys()
    await addStory(storyService.getEmptyStory())
    await updateStory({
        _id: 'm1oC7',
        title: 'Story-Good',
    })
    await removeStory('m1oC7')
    // TODO unit test addStoryMsg
}
