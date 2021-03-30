import React, { useState } from 'react'
import { Container, Button, Row, Form, Image } from 'react-bootstrap'

const Search = () =>
{
    const [flights, setFlights] = useState(true)
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ minHeight: 400, position: 'absolute', width: '80%', marginLeft: '10%' }}>
                <Row className='pt-3 mt-3'>
                    <div className='m-auto'>
                        <Button variant={flights ? "primary" : "outline-primary; box-shadow: none;"} onClick={() => setFlights(true)}><i className='fas fa-plane' /> Flights  </Button>
                        <Button variant={flights ? "outline-primary; box-shadow: none;" : "primary"} onClick={() => setFlights(false)}><i className='fas fa-bed' /> Hotels  </Button>
                    </div>
                </Row>
                {flights ? (
                    <Form style={{ background: '#007bff', height: 150 }}>
                        <h4>Flights</h4>
                        <Form.Check
                            disabled
                            type='radio'
                        />
                    </Form>
                ) : (
                    <Form style={{ background: '#007bff', height: 200 }}>
                        <center>
                            <h2 style={{ color: 'white' }}>Hotels</h2>
                        </center>
                        <Form.Check
                            disabled
                            type='radio'
                        />
                    </Form>
                )}
            </div>
            <Image style={{ height: 400, width: '100%' }} src='banner.jpg' />

        </div>
    )
}

export default Search
