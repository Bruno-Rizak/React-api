import { useEffect, useState, useRef} from "react";
import "./style.css";
import Trash from "../../assets/excluir.png";
import api from "../../services/api";

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


    async function getUsers(){
      const usersFromApi = await api.get('/usuarios')
    
      setUsers(usersFromApi.data)
      console.log(users)
    }

    async function createUsers(){
       await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      })
      getUsers()
    }

    async function deleteUsers(id){
      await api.delete(`/usuarios/${id}`)
      getUsers()
    }



  useEffect(() => {
    getUsers()
  }, [])
  

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de Usuarios</h1>
          <input type="text" placeholder="Nome" name="nome" ref={inputName} />
          <input type="number" placeholder="Idade" name="idade" ref={inputAge} />
          <input type="email" placeholder="E-mail" name="email" ref={inputEmail} />
          <button type="button" onClick={createUsers} >Cadastrar</button>
        </form>
        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
