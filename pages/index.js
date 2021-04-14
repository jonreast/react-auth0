import Head from 'next/head'
import Navbar from '../components/Navbar'
import Todo from '../components/Todo'
import { table, minifyRecords } from './api/utils/Airtable'
import {TodosContext} from '../contexts/TodosContext';
import {useEffect, useContext} from 'react';


export default function Home({ initalTodos }) {
  const {todos, setTodos} = useContext(TodosContext);

  useEffect(() => {
    setTodos(initalTodos)
  }, []);

  return (
    <div>
      <Head>
        <title>Authenticated TODO App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>

      <main>
        <h1>NextJS ToDo App</h1>
        <ul>
          {todos &&
            todos.map((todo => 
              <Todo key={todo.id} todo={todo} />
            ))}
        </ul>
      </main>

    </div>
  );
}

export async function getServerSideProps(context) {
  try{
    const todos = await table.select({}).firstPage();
    return {
      props: {
        initalTodos: minifyRecords(todos)
      }
    }
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: "Something went wrong"
      }
    }
  } 
}