from django.views import View
from django.http import JsonResponse
from .models import Aircraft
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


@method_decorator(csrf_exempt, name='dispatch')
class AircraftList(View):
    def get(self, request):
        aircrafts_number = Aircraft.objects.count()
        all_aircrafts = Aircraft.objects.all()
        aircrafts_data = []
        for item in all_aircrafts:
            aircrafts_data.append({
                'aircraft_id': item.id,
                'aircraft_name': item.aircraft_name,
                'key_facts': item.key_facts,
                'model': item.model,
                'category': item.category,
                'max_pax': item.max_pax,
                'typical_pax': item.typical_pax,
                'cabin_noise': item.cabin_noise,
                'cabin_altitude': item.cabin_altitude,
                'cabin_pressure': item.cabin_pressure,
                'sea_level_cabin': item.sea_level_cabin,
                'range_NM': item.range_NM,
                'range_Miles': item.range_Miles,
                'range_decrease_per_passenger': item.range_decrease_per_passenger,
                'seat_full_range_NM': item.seat_full_range_NM,
                'ferr_range_NM': item.ferr_range_NM,
                'high_cruise_MPH': item.high_cruise_MPH,
                'high_cruise_Mach': item.high_cruise_Mach,
                'long_range_cruise_knots': item.long_range_cruise_knots,
                'long_range_cruise_MPH': item.long_range_cruise_MPH,
                'long_range_cruise_Mach': item.long_range_cruise_Mach,
                'ceiling_feet': item.ceiling_feet,
                'TO_distance_feet': item.TO_distance_feet,
                'landing_distance_feet': item.landing_distance_feet,
                'rate_climb': item.rate_climb,
                'initial_cruise_altitude': item.initial_cruise_altitude,
                'ext_length_feet': item.ext_length_feet,
                'wingspan_feet': item.wingspan_feet,
                'exterior_height_feet': item.exterior_height_feet,
                'hangar_space_SF': item.hangar_space_SF,
                'int_length_feet': item.int_length_feet,
                'int_width_feet': item.int_width_feet,
                'int_height_feet': item.int_height_feet,
                'cabin_volume_CF': item.cabin_volume_CF,
                'ratio': item.ratio,
                'door_width_feet': item.door_width_feet,
                'door_height_feet': item.door_height_feet,
                'MTOW_lbs': item.MTOW_lbs,
                'max_ramp_weight_lbs': item.max_ramp_weight_lbs,
                'max_landing_weight_lbs': item.max_landing_weight_lbs,
                'max_payload_lbs': item.max_payload_lbs,
                'available_fuel_lbs': item.available_fuel_lbs,
                'useful_load_lbs': item.useful_load_lbs,
                'basic_operating_weight_lbs': item.basic_operating_weight_lbs,
                'baggage_capacity_CF': item.baggage_capacity_CF,
                'internal_baggage_CF': item.internal_baggage_CF,
                'external_baggage_CF': item.external_baggage_CF,
                'baggage_weight_lbs': item.baggage_weight_lbs,
                'engine_manufacturer': item.engine_manufacturer,
                'engine_model': item.engine_model,
                'thrust_output_lbs': item.thrust_output_lbs,
                'total_thrust_lbs': item.total_thrust_lbs,
                'hourly_fuel_burn_GPH': item.hourly_fuel_burn_GPH,
                'lateral_db': item.lateral_db,
                'flyover_db': item.flyover_db,
                'approach_db': item.approach_db,
                'production_start': item.production_start,
                'production_end': item.production_end,
                'in_production': item.in_production,
                'number_made': item.number_made,
                'number_in_service': item.number_in_service,
                'API_fleet_count': item.API_fleet_count,
                'serial_numbers': item.serial_numbers,
                'dispatch_reliability': item.dispatch_reliability,
                'single_pilot_certified': item.single_pilot_certified,
                'toilet': item.toilet,
                'shower': item.shower,
                'space_to_sleep': item.space_to_sleep,
                'dedicated_bed': item.dedicated_bed,
                'typical_avionic_suite': item.typical_avionic_suite,
                'flat_floor': item.flat_floor,
                'inflight_accessible_luggage': item.inflight_accessible_luggage,
                'lving_zone_count': item.lving_zone_count,
                'initial_crew_training_days': item.initial_crew_training_days,
                'recurrent_crew_training_days': item.recurrent_crew_training_days,
                'upgrade_crew_training_days': item.upgrade_crew_training_days,
                'estimated_hourly_charter': item.estimated_hourly_charter,
                'hourly_ownership_rate_NAmerica': item.hourly_ownership_rate_NAmerica,
                'profit_on_charter': item.profit_on_charter,
                'new_purchase': item.new_purchase,
                'average_pre_owned': item.average_pre_owned,
                'depreication_rate': item.depreication_rate,
                'annual_cost': item.annual_cost,
                'cabin_altitude_ceiling_meters': item.cabin_altitude_ceiling_meters,
                'altitude_sea_level_meters': item.altitude_sea_level_meters,
                'range_km': item.range_km,
                'high_speed_cruise_kmh': item.high_speed_cruise_kmh,
                'long_range_cruise_kmh': item.long_range_cruise_kmh,
                'ceiling_meters': item.ceiling_meters,
                'TO_distance_meters': item.TO_distance_meters,
                'landing_distance_meters': item.landing_distance_meters,
                'rate_climb_meters': item.rate_climb_meters,
                'initial_cruise_altitude_meters': item.initial_cruise_altitude_meters,
                'ext_length_meters': item.ext_length_meters,
                'wingspan_meters': item.wingspan_meters,
                'ext_height_meters': item.ext_height_meters,
                'hangar_space_square_meters': item.hangar_space_square_meters,
                'int_length_meters': item.int_length_meters,
                'int_width_meters': item.int_width_meters,
                'int_height_meters': item.int_height_meters,
                'cabin_volume_cubicmeters': item.cabin_volume_cubicmeters,
                'door_width_meters': item.door_width_meters,
                'door_height_meters': item.door_height_meters,
                'MTOW_kgs': item.MTOW_kgs,
                'max_ramp_weight_kgs': item.max_ramp_weight_kgs,
                'max_landing_weight_kgs': item.max_landing_weight_kgs,
                'max_payload_kgs': item.max_payload_kgs,
                'available_fuel_kgs': item.available_fuel_kgs,
                'useful_payloads_kgs': item.useful_payloads_kgs,
                'basic_operating_weight_kgs': item.basic_operating_weight_kgs,
                'baggage_capacity_cubicmeters': item.baggage_capacity_cubicmeters,
                'internal_baggage_cubicfeet': item.internal_baggage_cubicfeet,
                'external_baggage_cubicfeet': item.external_baggage_cubicfeet,
                'baggage_weight_kgs': item.baggage_weight_kgs,
                'thrust_output_kgs': item.thrust_output_kgs,
                'total_thrust_kgs': item.total_thrust_kgs,
                'hourly_fuel_burn_LPH': item.hourly_fuel_burn_LPH,
                'average_mission_length': item.average_mission_length,
                'image_name': item.aircraft_image.name
            })

        data = {
            'aircrafts': aircrafts_data,
            'count': aircrafts_number,
        }

        return JsonResponse(data)
