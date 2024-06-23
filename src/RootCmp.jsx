import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs.jsx'
import { StoryIndex } from './pages/StoryIndex.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { StoryDetails } from './pages/StoryDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx'
import { TaskDetails } from './pages/TaskDetails.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

export function RootCmp() {
    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="about" element={<AboutUs />}>
                        <Route path="team" element={<AboutTeam />} />
                        <Route path="vision" element={<AboutVision />} />
                    </Route>
                    <Route path="story" element={<StoryIndex />} />
                    <Route path="story/:storyId" element={<StoryDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="board" element={<BoardIndex />} />
                    <Route path="board/:boardId" element={<BoardDetails />} >
                        <Route path="group/:groupId/task/:taskId" element={<TaskDetails />} />
                    </Route>
                    <Route path="review" element={<ReviewIndex />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


