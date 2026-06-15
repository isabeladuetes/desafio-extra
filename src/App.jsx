import { useState, useEffect } from 'react';
import { supabase } from './supabase';

function App() {
    const [nome, setNome] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [recados, setRecados] = useState([]);

    async function buscarRecados() {
        const { data, error } = await supabase
            .from('recados')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.error(error);
            return;
        }

        setRecados(data || []);
    }

    useEffect(() => {
        buscarRecados();
    }, []);

    async function adicionarRecado() {
        if (!nome || !mensagem) return;

        const { error } = await supabase.from('recados').insert([
            {
                nome,
                mensagem,
            },
        ]);

        if (error) {
            alert('Erro ao salvar recado: ' + error.message);
            return;
        }

        setNome('');
        setMensagem('');

        buscarRecados();
    }

    return (
        <div style={{ padding: '30px' }}>
            <h1>Mural de Recados 🚀</h1>

            <input placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />

            <br />
            <br />

            <textarea
                placeholder="Digite seu recado"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
            />

            <br />
            <br />

            <button onClick={adicionarRecado}>Publicar</button>

            <hr />

            {recados.map((recado) => (
                <div key={recado.id}>
                    <h3>{recado.nome}</h3>
                    <p>{recado.mensagem}</p>
                </div>
            ))}
        </div>
    );
}

export default App;
