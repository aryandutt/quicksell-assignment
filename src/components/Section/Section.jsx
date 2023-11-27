import React, { useEffect, useState } from 'react'
import Headings from '../Headings/Headings'
import Cards from '../Cards/Cards'
import './section.css'

export default function Section({name, tickets, users, order, group}) {
  const [sortedTickets, setSortedTickets] = useState([]);
  
  useEffect(() => {
    function checkOrder(){
      if(order === 'priority'){
        tickets.sort((a, b) => {
            return b.priority-a.priority;
          });
        }else if(order === 'title'){
          tickets.sort((a, b) => {
            let fa = a.title.toLowerCase(),
                fb = b.title.toLowerCase();
    
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
              }
              return 0;
            });
          }
          setSortedTickets(tickets);
        }
        checkOrder();
      }, [tickets, sortedTickets, order])
      return (
    <div className="container-section">
      <Headings title={name} number={tickets.length} order={order} group={group} user={users}/>
      {sortedTickets.map((ticket, index) => (
          <Cards key={index} id={ticket.id} title={ticket.title} tags={ticket.tag} user={users.find(({id}) => id === ticket.userId)} ticket={ticket}/>
        ))}
    </div>
  )
}
