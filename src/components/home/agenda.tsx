import { useEffect, useState } from 'react';

const useTime = ({ timestamp, duration }: { timestamp: number; duration: number }) => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // get HH:MM in the local user timezone
    const localTime = new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // use the duration in milliseconds to calculate the end time
    const endTime = new Date(timestamp + duration).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setTime(`${localTime} - ${endTime}`);
  }, []);

  return time;
};

const useGetTimezone = () => {
  const [timezone, setTimezone] = useState<string | null>(null);

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(timezone);
  }, []);

  return timezone;
};

interface AgendaItem {
  timestamp: number;
  duration: number;
  title: string;
  description: string;
}

const AgendaItem = ({ timestamp, duration, title, description }: AgendaItem) => {
  const time = useTime({ timestamp, duration });

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
      <p className="w-auto shrink-0 text-sm font-medium dark:text-gray-300 sm:w-32 sm:text-right">
        {time}
      </p>
      <div className="hidden w-px bg-gray-700 sm:block sm:shrink-0" />
      <div className="flex-1 pb-4">
        <h4 className="-mt-2 mb-2 text-xl font-bold text-primary dark:text-yellow-100">{title}</h4>
        <p className="mb-6 text-base font-normal dark:text-stone-200">{description}</p>
      </div>
    </div>
  );
};
export const Agenda = () => {
  const timezone = useGetTimezone();

  return (
    <section id="agenda" className="flex flex-col flex-wrap items-center justify-center pt-48">
      <h2 className="text-center font-serif text-6xl">Agenda</h2>
      <p className="mt-4 max-w-xl text-center">Mira los detalles de como sera el dia</p>

      <section className="antialiased">
        <div className="mx-auto max-w-2xl px-4 py-4 lg:px-6">
          <div className="mx-auto w-full max-w-xl space-y-4 text-center">
            <span className="fon-boldn inline-flex items-center rounded-full bg-primary px-3 py-1 text-sm font-medium dark:bg-yellow-100 dark:text-stone-950">
              <svg
                aria-hidden="true"
                className="mr-1 h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#000"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="mr-1 font-bold opacity-75">Zona horaria de la agenda:</span>{' '}
              {timezone}
            </span>
          </div>
          <div className="mt-12 grid gap-x-16 gap-y-12 lg:mt-16">
            <div className="space-y-8">
              <AgendaItem
                timestamp={1694620800000}
                duration={30 * 60 * 1000}
                title="Boda Civil"
                description="Consolidaremos muy emocionados nuestra union."
              />
              <AgendaItem
                timestamp={1694622000000}
                duration={40 * 60 * 1000}
                title="Almuerzo Familiar"
                description="Disfrutaremos con nuestra familia y amigos."
              />
              <AgendaItem
                timestamp={1694624400000}
                duration={480 * 60 * 1000}
                title="Fiesta de Celebracion"
                description="Celebraremos hasta que el cuerpo aguante."
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
