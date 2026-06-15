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
        <div style={styles.container}>
            <div style={styles.contentWrapper}>
                <h1 style={styles.title}>Mural de Recados 🚀</h1>

                {/* Formulário */}
                <div style={styles.formCard}>
                    <input
                        style={styles.input}
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <textarea
                        style={styles.textarea}
                        placeholder="Digite seu recado..."
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                    />

                    <button style={styles.button} onClick={adicionarRecado}>
                        Publicar Recado
                    </button>
                </div>

                <div style={styles.divider}></div>

                {/* Lista de Recados */}
                <div style={styles.feed}>
                    {recados.length === 0 ? (
                        <p style={styles.emptyText}>
                            Nenhum recado por aqui ainda. Seja o primeiro! 👇
                        </p>
                    ) : (
                        recados.map((recado) => (
                            <div key={recado.id} style={styles.messageCard}>
                                <div style={styles.avatar}>
                                    {recado.nome ? recado.nome.charAt(0).toUpperCase() : '?'}
                                </div>
                                {/* Div corrigida que alinha os textos corretamente */}
                                <div style={styles.messageContentWrapper}>
                                    <h3 style={styles.userName}>{recado.nome}</h3>
                                    <p style={styles.userMessage}>{recado.mensagem}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

// Objeto com a estilização moderna da página corrigido
const styles = {
    container: {
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
    },
    contentWrapper: {
        width: '100%',
        maxWidth: '600px',
    },
    title: {
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '30px',
        fontSize: '2.5rem',
        fontWeight: '700',
    },
    formCard: {
        backgroundColor: '#ffffff',
        padding: '25px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        backgroundColor: '#f8fafc',
    },
    textarea: {
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
        outline: 'none',
        minHeight: '100px',
        resize: 'vertical',
        backgroundColor: '#f8fafc',
        fontFamily: 'inherit',
    },
    button: {
        backgroundColor: '#4f46e5',
        color: '#ffffff',
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s, transform 0.1s',
    },
    divider: {
        height: '1px',
        backgroundColor: '#e2e8f0',
        margin: '40px 0',
    },
    feed: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    emptyText: {
        textAlign: 'center',
        color: '#94a3b8',
        fontStyle: 'italic',
    },
    messageCard: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
        borderLeft: '5px solid #4f46e5',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#e0e7ff',
        color: '#4f46e5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        flexShrink: 0,
    },
    userName: {
        margin: 0,
        color: '#1e293b',
        fontSize: '1.1rem',
        fontWeight: '600',
        textAlign: 'left',
    },
    userMessage: {
        margin: 0,
        color: '#475569',
        lineHeight: '1.5',
        wordBreak: 'break-word',
        textAlign: 'left',
    },
    // Chave corrigida para o padrão JavaScript (CamelCase e sintaxe correta)
    messageContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px',
        width: '100%',
    }
};

export default App;
