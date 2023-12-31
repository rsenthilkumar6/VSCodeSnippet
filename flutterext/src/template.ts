import { toCamelCase, toSnakeCase } from "./utils";

export function getStatelessWidget(name: string) {
  const nameInCamelCase = toCamelCase(name);
  const nameInSnakeCase = toSnakeCase(name);

  console.debug(`nameInCamelCase: ${nameInCamelCase}`);
  console.debug(`nameInSnakeCase: ${nameInSnakeCase}`);

  const viewTemplate = `
part of '${nameInSnakeCase}.dart';

class ${nameInCamelCase}View extends StatelessWidget {
  const StartupView({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}
`;

  return viewTemplate;
}

export function getConsumerWidget(name: string) {
  const nameInCamelCase = toCamelCase(name);
  const nameInSnakeCase = toSnakeCase(name);

  console.debug(`nameInCamelCase: ${nameInCamelCase}`);
  console.debug(`nameInSnakeCase: ${nameInSnakeCase}`);

  const viewTemplate = `
part of '${nameInSnakeCase}.dart';

class ${nameInCamelCase}View extends ConsumerWidget {
	  const StartupView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
	return const Scaffold(
	  body: Center(
		child: CircularProgressIndicator(),
	  ),
	);
  }
}
`;

  return viewTemplate;
}

export function getRiverpodModel(name: string) {
  const nameInCamelCase = toCamelCase(name);
  const nameInSnakeCase = toSnakeCase(name);

  console.debug(`nameInCamelCase: ${nameInCamelCase}`);
  console.debug(`nameInSnakeCase: ${nameInSnakeCase}`);

  const viewTemplate = `
part of '${nameInSnakeCase}.dart';

@riverpod
class StartupModel extends _$StartupModel {
  final _log = getLogger('StartupModel');

  @override
  String build() {
    _log.t('Building');
    return 'Welcome to Admin Panel';
  }

  Future<void> init() async {
    _log.t('Initializing');

    await Future.delayed(const Duration(seconds: 1));

    final navigator = ref.read(navigationServiceProvider);
    navigator.go(RouteLocations.students);
  }
}
`;

  return viewTemplate;
}
