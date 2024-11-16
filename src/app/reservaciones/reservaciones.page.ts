import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Table {
  name: string;
  status: 'reserved' | 'checked-in' | 'free';
  reservedBy: string;
  people: number;
  time: string; // La hora y fecha de la reserva
  reservedByPhone?: string;
}

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],
})
export class ReservacionesPage implements OnInit {
  searchQuery: string = '';
  currentFilter: string = 'all';
  isDarkMode: boolean = false;
  reservations: Table[] = [];
  availableTables: Table[] = []; // Mesas predeterminadas
  showDatePicker: boolean = false;
  selectedDate: string = ''; // Fecha seleccionada
  showTimePicker: boolean = false;
  selectedTime: string = '';

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.loadAvailableTables();
    this.getReservations();
  }

  // Cargar mesas predeterminadas
  loadAvailableTables() {
    this.availableTables = [
      { name: 'Mesa 1', status: 'free', reservedBy: '', people: 0, time: '' },
      { name: 'Mesa 2', status: 'free', reservedBy: '', people: 0, time: '' },
      { name: 'Mesa 3', status: 'free', reservedBy: '', people: 0, time: '' },
    ];
  }

  // Método para obtener las reservas de Firestore
  getReservations() {
    const reservasCollection = collection(this.firestore, 'reservas');
    collectionData(reservasCollection, { idField: 'id' }).subscribe((data: any[]) => {
      this.reservations = data.map((reservation) => ({
        name: reservation.userId,
        status: 'reserved',
        reservedBy: reservation.nombre,
        reservedByPhone: reservation.telefono,
        people: reservation.personas,
        time: reservation.fecha + ' ' + reservation.hora, // Asumimos que la fecha y hora están separadas
      }));

      console.log("Reservas cargadas: ", this.reservations); // Depuración

      // Asignar las reservas a las mesas
      this.assignReservationsToTables();
    });
  }

  // Asignar reservas a mesas disponibles
  assignReservationsToTables() {
    this.reservations.forEach(reservation => {
      const availableTable = this.availableTables.find(table => table.status === 'free');
      if (availableTable) {
        availableTable.status = 'reserved';
        availableTable.reservedBy = reservation.reservedBy;
        availableTable.reservedByPhone = reservation.reservedByPhone;
        availableTable.people = reservation.people;
        availableTable.time = reservation.time;
      }
    });
  }

  // Método para aceptar una reserva
  acceptReservation(table: Table) {
    table.status = 'checked-in';
  }

  // Método para rechazar una reserva
  rejectReservation(table: Table) {
    table.status = 'free';
    table.reservedBy = '';
    table.people = 0;
    table.time = '';
    table.reservedByPhone = '';
  }

  // Método para cambiar el filtro de estado de las reservas
  filterStatus(status: string) {
    this.currentFilter = status;
  }

  // Filtrar las mesas por estado y fecha
  filteredTables() {
    console.log("Filtro aplicado: ", this.selectedDate); // Depuración

    return this.availableTables.filter(table => {
      const matchesStatus = this.currentFilter === 'all' || table.status === this.currentFilter;
      const matchesSearch = this.searchQuery.trim() === '' || table.reservedBy.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesDate = !this.selectedDate || this.filterByDate(table.time); // Filtrar por fecha

      console.log("Estado: ", table.status, "Nombre: ", table.reservedBy, "Fecha: ", table.time, "Coincide con fecha: ", matchesDate);

      return matchesStatus && matchesSearch && matchesDate;
    });
  }

  // Función que compara la fecha de la reserva (sin la hora) con la fecha seleccionada
filterByDate(reservationTime: string): boolean {
  if (!reservationTime) return false;

  const [reservationDate, _] = reservationTime.split(' '); // Solo extraemos la fecha
  return reservationDate === this.selectedDate; // Comparar solo la fecha
}

  // Mostrar u ocultar el selector de fecha
  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

 // Manejar el cambio de fecha
onDateChange(event: any) {
  // Asegurarte de que la fecha seleccionada esté en el formato 'YYYY-MM-DD'
  const selectedDate = event.detail.value.split('T')[0]; // Extraer solo la fecha
  this.selectedDate = selectedDate;
  this.showDatePicker = false;  // Ocultar el selector de fecha después de seleccionarla
}

  // Mostrar u ocultar el selector de hora
  toggleTimePicker() {
    this.showTimePicker = !this.showTimePicker;
  }

  // Manejar el cambio de hora
  onTimeChange(event: any) {
    this.selectedTime = event.detail.value;
    this.showTimePicker = false;
  }
}
