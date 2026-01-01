import { useContext } from 'react'
import { AuthContext } from "./context/AuthContext"

const Home = () => {
  const { name, loggedIn } = useContext(AuthContext)

  return (
    <main className="home-main">

      {loggedIn ? (
        <h2 className="home-heading">Welcome {name} 👋</h2>
      ) : (
        <h2 className="home-heading">Welcome to Post Manager</h2>
      )}

      <p className="home-paraone">
        <strong>Post Manager</strong> is a secure, user-friendly web application that allows users
        to create, view, edit, and delete posts with complete ownership control.
        Each user can manage only their own posts, ensuring privacy and data integrity.
      </p>

      <p className="home-paratwo">
        The application is built using a modern full-stack architecture.
        The backend is responsible for authentication, authorization, and data storage,
        while the frontend delivers a clean and responsive user experience.
      </p>

      <h3 className="home-subheading">Key Features</h3>
      <ul className="home-features">
        <li>🔐 Secure user authentication and authorization</li>
        <li>📝 Create, update, and delete your own posts</li>
        <li>👤 Personalized content for each logged-in user</li>
        <li>⚡ Fast and responsive interface</li>
      </ul>

      <h3 className="home-subheading">How It Works</h3>
      <p className="home-parathree">
        After signing up or logging in, users can create posts that are linked to their account.
        All actions such as editing or deleting posts are restricted to the post owner.
        This ensures a secure and personalized content management experience.
      </p>

      {!loggedIn && (
        <p className="home-cta">
          Please <strong>login</strong> or <strong>sign up</strong> to start creating and managing your posts.
        </p>
      )}

    </main>
  )
}

export default Home
