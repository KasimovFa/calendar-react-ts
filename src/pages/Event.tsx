import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Layout, Row, Modal} from "antd";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/UserActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Event:FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {fetchGuests, createEvent, fetchEvents} = useActions();
    const {guests, events} = useTypedSelector(state => state.event);
    const {user} = useTypedSelector(state => state.auth);

    useEffect(() => {
        fetchGuests();
        fetchEvents(user.username)
    },[]);

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false);
        createEvent(event);
    }
    return (
        <Layout>
            <EventCalendar events={events} />
            <Row justify="center" style={{paddingBottom: '20px'}}>
              <Button
                  onClick={() => setModalVisible(true)}
              >
                Добавить событие
              </Button>
           </Row>
            <Modal
                title="Добавить событие"
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm
                    guests={guests}
                    submit = {addNewEvent}
                />
            </Modal>
        </Layout>
    );
};

export default Event;