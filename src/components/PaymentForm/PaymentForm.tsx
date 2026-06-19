import React, { useState } from 'react';

interface PaymentFormProps {
    amount: number;
    email: string;
    name: string;
    setEmail: (value: string) => void;
    setName: (value: string) => void;
    onSuccess?: () => void; 
}

export function PaymentForm({ amount, email, name, setEmail, setName, onSuccess }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          userEmail: email,
          userName: name
        })
      });

      const data = await response.json();
      if (data.success) {
        setSent(true);
        
        if (onSuccess) {
          onSuccess();
        }
        
        alert('Заказ оформлен! Проверьте вашу почту.');
      } else {
        alert('Ошибка при отправке данных на сервере');
      }
    } catch (err) {
      console.error(err);
      alert('Нет связи с бэкенд-сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '25px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'left', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%', boxSizing: 'border-box' }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>Оформление заказа</h3>
      <p style={{ color: '#666' }}>Сумма к оплате: <b style={{ fontSize: '18px', color: '#ff7ebb' }}>{amount} ₸</b></p>
      
      {sent ? (
        <div style={{ color: 'green', fontWeight: 'bold', padding: '10px 0' }}>🎉 Заказ успешно оформлен! Уведомление отправлено.</div>
      ) : (
        <form id="robo-payment-form" onSubmit={handlePayment}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#555' }}>Ваше имя:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          
          <div style={{ marginBottom: '0px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#555' }}>Email для отправки чека:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          
          {loading && <p style={{ color: '#ff7ebb', marginTop: '10px', marginBottom: 0 }}>Отправка письма...</p>}
        </form>
      )}
    </div>
  );


//   return (
//     <div style={{ padding: '25px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'left', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%', boxSizing: 'border-box' }}>
//       <h3 style={{ marginTop: 0, color: '#333' }}>Оформление заказа</h3>
//       <p style={{ color: '#666' }}>Сумма к оплате: <b style={{ fontSize: '18px', color: '#ff7ebb' }}>{amount} ₸</b></p>
      
//       {sent ? (
//         <div style={{ color: 'green', fontWeight: 'bold', padding: '10px 0' }}>🎉 Заказ успешно оформлен! Уведомление отправлено.</div>
//       ) : (
//         <form id="robo-payment-form" onSubmit={handlePayment}>
//           <div style={{ marginBottom: '12px' }}>
//             <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#555' }}>Ваше имя:</label>
//             <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
//           </div>
          
//           <div style={{ marginBottom: '0px' }}>
//             <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: '#555' }}>Email для отправки чека:</label>
//             <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
//           </div>
          
//           {loading && <p style={{ color: '#ff7ebb', marginTop: '10px', marginBottom: 0 }}>Отправка письма...</p>}
//         </form>
//       )}
//     </div>
//   );
}
