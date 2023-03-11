# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- None.

## [1.0.0-alpha.1] - 2023-03-10

### Added

- Add optional parameters in constructors.
- Add the import function:
  - We use the node fetch API by default, be sure to have node >= v17.15 installed. 
- Add a store:
  - `IConnectorStore`
  - `ConnectorStoreMap`
- Add a factory:
  - `IConnectorFactory`
  - `ConnectorFactoryDefault`
  - `ConnectorFactory`
- Support basic `Catalog`, `SaleSession`, `Order` and `OrderLine`.
- Add options to importer and exporter (`IGetterOptions`).

### Changed

- License to MIT.
- Use virtual_assembly/semantizer v1.0.0-alpha.1.
- `README.md` and `CHANGELOG.md` files.

## [1.0.0-alpha] - 2022-10-26

### Added

- Initial release.

[unreleased]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.1...HEAD
[1.0.0-alpha.1]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha...v1.0.0-alpha.1
[1.0.0-alpha]: https://github.com/datafoodconsortium/connector-typescript/releases/tag/v1.0.0-alpha
