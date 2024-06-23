import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadStorys, addStory, updateStory, removeStory, addStoryMsg } from '../store/story.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service'
import { storyService } from '../services/story.service'

export function StoryIndex() {

    const storys = useSelector(storeState => storeState.storyModule.storys)

    useEffect(() => {
        loadStorys()
    }, [])

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
            showSuccessMsg('Story removed')            
        } catch (err) {
            showErrorMsg('Cannot remove story')
        }
    }

    async function onAddStory() {
        const story = storyService.getEmptyStory()
        story.vendor = prompt('Vendor?')
        try {
            const savedStory = await addStory(story)
            showSuccessMsg(`Story added (id: ${savedStory._id})`)
        } catch (err) {
            showErrorMsg('Cannot add story')
        }        
    }

    async function onUpdateStory(story) {
        const price = +prompt('New price?', story.price)
        const storyToSave = { ...story, price }
        try {
            const savedStory = await updateStory(storyToSave)
            showSuccessMsg(`Story updated, new price: ${savedStory.price}`)
        } catch (err) {
            showErrorMsg('Cannot update story')
        }        
    }

    

    function shouldShowActionBtns(story) {
        return true
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return story.owner?._id === user._id
    }

    return (
        <div>
            <h3>Storys App</h3>
            <main>
                <button onClick={onAddStory}>Add Story ⛐</button>
                <ul className="story-list">
                    {storys.map(story =>
                        <li className="story-preview" key={story._id}>
                            <Link to={`${story._id}`}>
                                <h4>{story.vendor}</h4>
                           </Link>
                            <h1>⛐</h1>
                            <p>Price: <span>${story.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{story.owner && story.owner.fullname}</span></p>
                            {shouldShowActionBtns(story) && <div>
                                <button onClick={() => { onRemoveStory(story._id) }}>x</button>
                                <button onClick={() => { onUpdateStory(story) }}>Edit</button>
                            </div>}
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}