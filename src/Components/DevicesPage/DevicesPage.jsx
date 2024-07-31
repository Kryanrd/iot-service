import styles from "./DevicesPage.module.css";
import React, { useState } from 'react';
import DeviceCard from "../DeviceCard/DeviceCard";
import DevicesList from "../DevicesList/DevicesList";
import AddDeviceDialog from "../dialogs/AddDeviceDialog/AddDeviceDialog";
import EditDeviceDialog from "../dialogs/EditDeviceDialog/EditDeviceDialog";
import DeleteDeviceDialog from "../dialogs/DeleteDeviceDialog/DeleteDeviceDialog";
import AddSensorDialog from "../dialogs/AddSensorDialog/AddSensorDialog";
import EditSensorDialog from "../dialogs/EditSensorDialog/EditSensorDialog";
import StartCard from "../StartCard/StartCard";
import MapCard from "../MapCard/MapCard";

const DevicesPage = ({ currentPage, setCurrentPage, activeDeviceId, setActiveDeviceId }) => { 
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isAddSensorDialogOpen, setIsAddSensorDialogOpen] = useState(false);
    const [isEditSensorDialogOpen, setIsEditSensorDialogOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const devices = [
        { id: 1, name: "Устройство 1", description: "Описание устройства 1", latitude: 55.7558, longitude: 37.6173 },
        { id: 2, name: "Устройство 2", description: "Описание устройства 2", latitude: 55.7510, longitude: 37.5586 },
        { id: 3, name: "Устройство 3", description: "Описание устройства 3", latitude: 55.7300, longitude: 37.6430 },
        { id: 4, name: "Устройство 4", description: "Описание устройства 4", latitude: 55.7400, longitude: 37.6200 },
        { id: 5, name: "Устройство 5", description: "Описание устройства 5", latitude: 55.7520, longitude: 37.6150 },
    ];

    const handleOpenAddDialog = () => {
        setIsAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setIsAddDialogOpen(false);
    };

    const handleOpenEditDialog = () => {
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
    };

    const handleOpenDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleOpenAddSensorDialog = () => {
        setIsAddSensorDialogOpen(true);
    };

    const handleCloseAddSensorDialog = () => {
        setIsAddSensorDialogOpen(false);
    };

    const handleOpenEditSensorDialog = () => {
        setIsEditSensorDialogOpen(true);
    };

    const handleCloseEditSensorDialog = () => {
        setIsEditSensorDialogOpen(false);
    };

    const handleDeviceClick = (device) => {
        setSelectedDevice(device);
        setCurrentPage('devices');
        setActiveDeviceId(device.id);  // Set the active device ID
    };

    return (
        <>
            {isAddDialogOpen && <AddDeviceDialog onClose={handleCloseAddDialog} />}
            {isEditDialogOpen && <EditDeviceDialog onClose={handleCloseEditDialog} />}
            {isDeleteDialogOpen && <DeleteDeviceDialog onClose={handleCloseDeleteDialog} />}
            {isAddSensorDialogOpen && <AddSensorDialog onClose={handleCloseAddSensorDialog} />}
            {isEditSensorDialogOpen && <EditSensorDialog onClose={handleCloseEditSensorDialog} />}
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles["nav-devices"]}>
                        <DevicesList 
                            onAddDevice={handleOpenAddDialog} 
                            onDeviceClick={handleDeviceClick} 
                            activeDeviceId={activeDeviceId} // Pass the active device ID
                        />
                    </div>
                    <div className={styles.card}>
                        {currentPage === 'start' ? (
                            <>
                                <StartCard devices={devices}/>
                                <MapCard devices={devices} onDeviceClick={handleDeviceClick} />
                            </>
                        ) : (
                            selectedDevice && (
                                <DeviceCard
                                    device={selectedDevice}
                                    onEditDevice={handleOpenEditDialog}
                                    onDeleteDevice={handleOpenDeleteDialog}
                                    onAddSensor={handleOpenAddSensorDialog}
                                    onEditSensor={handleOpenEditSensorDialog}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DevicesPage;
