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

const DevicesPage = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isAddSensorDialogOpen, setIsAddSensorDialogOpen] = useState(false);
    const [isEditSensorDialogOpen, setIsEditSensorDialogOpen] = useState(false);

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
                        <DevicesList onAddDevice={handleOpenAddDialog} />
                    </div>
                    <div className={styles.test}>
                        {/* <StartCard/>
                        <MapCard/> */}
                        <DeviceCard
                            onEditDevice={handleOpenEditDialog}
                            onDeleteDevice={handleOpenDeleteDialog}
                            onAddSensor={handleOpenAddSensorDialog}
                            onEditSensor={handleOpenEditSensorDialog}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DevicesPage;
