import { NextResponse } from "next/server";

const Books = [
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    availability: true,
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    availability: false,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    availability: true,
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    availability: false,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    availability: true,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    availability: false,
  },
  {
    title: "1984",
    author: "George Orwell",
    availability: true,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    availability: true,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    availability: false,
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    availability: true,
  },
];

export async function GET() {
  try {
    return NextResponse.json(Books, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching books" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const newBook = await req.json();
    Books.push(newBook);
    return NextResponse.json(
      { message: "Book has been added successfully" },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json(
      { message: "something went wrong", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { index, updatedBook } = await req.json();
    if (Books[index]) {
      Books[index] = updatedBook;
      return NextResponse.json(
        { message: "Book updated successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  } catch (error) {
    NextResponse.json({ message: "something went wrong" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { index } = await req.json();
    if(Books[index]){
      Books.splice(index,1)
      return NextResponse.json({message:"Book Removed successfully"},{status:200})
    }
  return NextResponse.json({message:"Book not found"},{status:400})
  }
    
  catch (error) {
    NextResponse.json(
      { message: "something went wrong", error },
      { status: 500 }
    );
  }
}
