<!-- import { useEffect } from "react"
import { useDelete } from "../hooks/remote/useDelete"
import { useGet } from "../hooks/remote/useGet"
import { useInsert } from "../hooks/remote/useInsert"
import { useUpdate } from "../hooks/remote/useUpdate"

function App() {
  const { mutate: addFeedback } = useInsert('feedbacks', 'feedbacks')
  const { mutate: deleteFeedback } = useDelete('feedbacks')
  const { mutate: updateFeedback } = useUpdate('feedbacks')

  const { data, isLoading, error } = useGet('feedbacks', {
    filters: [{ column: 'created_at', operator: 'eq', value: "2025-07-19T09:00:23.103101+00:00" }],
    limit: 2,
    orderBy: { column: 'created_at', ascending: false },
  })

  useEffect(() => {
    updateFeedback({
      filter: { id: 8 },
      changes: { content: "This is an updated feedback" }
    })
  })

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className="flex flex-col">
        <button onClick={() => { addFeedback({ shop_id: 12345678, content: "This is a test feedback", customer_name: 'Test Customer' }) }}>add feedback</button>
        <button onClick={() => { deleteFeedback({ id: 12 }) }}>delete feedback</button>
        <button onClick={() =>
          updateFeedback({
            match: { id: 8 },
            updates: { content: "This is an updated feedback" }
          })
        }>
          Update feedback
        </button>
      </div>
    </>
  )
}
export default App -->
