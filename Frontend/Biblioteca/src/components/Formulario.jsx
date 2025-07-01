import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Formulario = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    book: '',
    author: '',
    description: '',
    stars: '',
  });
  const [quantity, setQuantity] = useState(0);

  const [livroSelecionado, setLivroSelecionado] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/home');
      setBooks(res.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/home', form);
      setBooks((prevBooks) => [...prevBooks, res.data.data]);
      setForm({ book: '', author: '', description: '', stars: '' });
      setQuantity(books.length + 1); // Atualiza a quantidade de livros
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/home/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      setQuantity(books.length - 1); // Atualiza a quantidade de livros
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  const updateFavorite = async (id, currentfavorite) => {
    try {
      await axios.put(`http://localhost:3000/home/${id}`, { favorite: !currentfavorite });
      fetchBooks(); // Atualiza a lista de livros após a alteração
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }

  };

  const abrirModal = (livro) => {
    setLivroSelecionado(livro);
  };

  const fecharModal = () => {
    setLivroSelecionado(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-5xl font-bold text-center opacity-50 p-25 mb-6">Digite Seus Livros!</h1>

      {/* FORMULÁRIO */}
      <div className="bg-gray-200 rounded-4xl shadow mb-8 p-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="book"
            placeholder="Nome do livro"
            value={form.book}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-300"
          />
          <input
            type="text"
            name="author"
            placeholder="Autor"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-300"
          />
          <textarea
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-300"
          />
          <input
            type="number"
            name="stars"
            placeholder="Estrelas"
            value={form.stars}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border border-gray-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Adicionar Livro
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-6 opacity-50">Lista de Livros</h2>
        {quantity > 0 && <p className="text-center text-gray-600 mb-4">Total de livros: {quantity}</p>}

      </div>

      {/* LISTA DE LIVROS */}
      {books.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum livro encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book._id} className="border p-4 rounded shadow">
              <strong className="text-lg">{book.book}</strong> por {book.author}
              <div className="mt-2">
                <button
                  onClick={() => abrirModal(book)}
                  className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Mais informações
                </button>
                <button
                  onClick={() => deleteBook(book._id)}
                  className="bg-red-600 text-white px-3 py-1 ml-4 rounded hover:bg-red-700 transition"
                >
                  Excluir
                </button>
                <button
                  onClick={() => updateFavorite(book._id, book.favorite)}
                  className={`ml-4 px-3 py-1 rounded transition ${book.favorite ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}
                >
                  {book.favorite ? '★ Favoritado' : '☆ Favoritar'}
                </button>

              </div>

            </li>
          ))}
        </ul>
      )}


      {/* MODAL */}
      {livroSelecionado && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-2">{livroSelecionado.book}</h2>
            <p><strong>Autor:</strong> {livroSelecionado.author}</p>
            <p className="mt-2"><strong>Descrição:</strong> {livroSelecionado.description}</p>
            <p className="mt-2"><strong>Estrelas:</strong> {livroSelecionado.stars}</p>
            <button
              onClick={fecharModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



export default Formulario;
