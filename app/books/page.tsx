"use client"

import React , {useState, useEffect} from "react"



interface Book {
    title :string,
    author :string,
    availability:boolean

}


const Booklist = ()=>{
const [books, setBooks] = useState<Book[]>([])
const [loading , setLoading] = useState<boolean>(true)
const [error , setError] = useState<string | null>(null)

const [newBook , setNewBook] = useState<Book>({
  title:"",
  author:"",
  availability:true
})


useEffect(()=>{
    const fetchBooks = async() =>{
        try {
            const  response = await fetch("/api/books")
            if(!response.ok){
                throw new Error(`Failed to fetch books:${response.statusText}`)
            }
            const data = await response.json()
            setBooks(data)
        } catch (error) {
            setError((error as Error).message)
        }finally{
            setLoading(false)
        }
    }
    fetchBooks()
}, [])

const addBook = async()=>{
  try {
    const response = await fetch( "/api/books",{
      method :"POST",
      headers:{"Content-Type":"application/json"},
      body :JSON.stringify(newBook)

    })

    if(!response.ok) throw new Error("failed to add book")
      const updatedBooks =[...books,newBook]
    setBooks(updatedBooks);
    setNewBook({title:"",author:"",availability:true})

  } catch (error) {
    alert((error as Error).message);
    
  }
}
const removeBook = async (index:number) =>{
  try {
    const response = await fetch ("/api/books",{
      method:"Delete",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({index})
    })
    
    if(!response.ok) throw new Error("Failed to remove book");
    const updatedBooks = books.filter((_,i)=> i !==index);
    setBooks(updatedBooks)


  } catch (error) {
    alert((error as Error).message)
    
  }
  
}

 const updateBook = async (index: number) => {
    try {
      const updatedBook = { ...books[index], availability: !books[index].availability };
      const response = await fetch("/api/books", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index, updatedBook }),
      });
      if (!response.ok) throw new Error("Failed to update book");
      const updatedBooks = [...books];
      updatedBooks[index] = updatedBook;
      setBooks(updatedBooks);
    } catch (error) {
      alert((error as Error).message);
    }
  };




  if (loading) return <div className="h-screen flex items-center justify-center"><p className="text-center text-4xl text-gray-800 dark:text-gray-200">Loading...</p></div>;
  if (error) return <p className="text-center text-red-500 dark:text-red-400">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Library Books</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white dark:border-teal-500 dark:border-2 dark:bg-gray-900 shadow-lg rounded-xl p-10 hover:shadow-indigo-400/30  hover:shadow-lg hover:scale-x-105 duration-200 transition-all"
          >
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p>by {book.author}</p>
            <p
              className={`mt-2 text-sm ${
                book.availability ? "text-green-600" : "text-red-600"
              }`}
            >
              {book.availability ? "Available" :"booked"}
            </p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => updateBook(index)}
                className="bg-blue-500/50 text-white px-4 py-2 rounded-lg"
              >
                Book now
              </button>
              <button
                onClick={() => removeBook(index)}
                className="bg-red-500/50 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8  p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-bold">Add a New Book</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addBook();
          }}
          className="mt-4 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="w-full bg-slate-300 px-4 py-2 rounded-lg"
              required
              placeholder="Enter your Book name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Author</label>
            <input
              type="text"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              className="w-full px-4 py-2 bg-slate-300 rounded-lg"
              placeholder="Enter Author Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Availability</label>
            <select
              value={newBook.availability ? "true" : "false"}
              onChange={(e) =>
                setNewBook({ ...newBook, availability: e.target.value === "true" })
              }
              className="w-full bg-slate-300 text-black  px-4 py-2 rounded-lg"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 w-full text-white px-4 py-2 rounded-lg"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );

};

export default Booklist;